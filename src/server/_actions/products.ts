"use server";
import { getCurrentLocale } from "@/lib/getCurrentLocale ";
import getImageURL from "@/lib/getImageURL";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import { addProductSchema, editProductSchema } from "@/validations/product";
import { Extra, ExtraIngrediants, ProductSize, Size } from "@prisma/client";
import { revalidatePath } from "next/cache";
//////////////////////
// Add Product Action
/////
export const addProduct = async (
  args: {
    options: { sizes: Partial<Size>[]; extras: Partial<Extra>[] };
  },
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();
  const translation = await getTrans(locale);
  const result = addProductSchema(translation).safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) {
    return {
      status: 400,
      message: translation.errors.invalidCredentials,
      error: result.error.message,
      formData,
    };
  }

  const data = result.data;
  const basePrice = Number(data.basePrice);
  const imageFile = data.image as File;
  let imageURL = "";

  if (Boolean(imageFile.size)) {
    const uploadedImageURL = await getImageURL(imageFile, "product");
    imageURL = uploadedImageURL || "";
  }

  try {
    await db.product.create({
      data: {
        ...data,
        image: imageURL,
        basePrice,
        categoryId: data.categoryId, // Use categoryId from form data
        sizes: {
          createMany: {
            data: args.options.sizes.map((size) => ({
              name: size.name as ProductSize,
              price: Number(size.price),
            })),
          },
        },
        extras: {
          createMany: {
            data: args.options.extras.map((extra) => ({
              name: extra.name as ExtraIngrediants,
              price: Number(extra.price),
            })),
          },
        },
      },
    });

    revalidatePath(`/${locale}/admin/products`);
    revalidatePath(`/${locale}/admin`);
    revalidatePath(`/${locale}/admin/categories`);

    return {
      status: 200,
      message: translation.messages.registerSuccess,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translation.errors.somethingWentWrong,
    };
  }
};
//////////////////////
// Edit Product Action
////
export const editProduct = async (
  args: {
    productId: string;
    options: { sizes: Partial<Size>[]; extras: Partial<Extra>[] };
  },
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();
  const translation = await getTrans(locale);
  const result = editProductSchema(translation).safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) {
    return {
      status: 400,
      message: translation.errors.invalidCredentials,
      error: result.error.message,
      formData,
    };
  }

  const data = result.data;
  const basePrice = Number(data.basePrice);
  const imageFile = data.image as File;
  let imageURL = "";

  if (Boolean(imageFile.size)) {
    const uploadedImageURL = await getImageURL(imageFile, "product");
    imageURL = uploadedImageURL || "";
  }

  try {
    const product = await db.product.findUnique({
      where: {
        id: args.productId,
      },
    });

    if (!product) {
      return {
        status: 400,
        message: "product not found",
      };
    }
    await db.product.update({
      where: { id: args.productId },
      data: {
        ...data,
        image: imageURL !== "" ? imageURL : product.image,
        basePrice,
        categoryId: data.categoryId,
        sizes: {
          deleteMany: {},
          createMany: {
            data: args.options.sizes.map((size) => ({
              name: size.name as ProductSize,
              price: Number(size.price),
            })),
          },
        },
        extras: {
          deleteMany: {},
          createMany: {
            data: args.options.extras.map((extra) => ({
              name: extra.name as ExtraIngrediants,
              price: Number(extra.price),
            })),
          },
        },
      },
    });

    revalidatePath(`/${locale}/admin/products`);
    revalidatePath(`/${locale}/admin`);
    revalidatePath(`/${locale}/admin/categories`);

    return {
      status: 200,
      message: translation.messages.updateSuccess,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translation.errors.somethingWentWrong,
    };
  }
};
//////////////////////
// Get Product By Id
////
export const getProductById = async (id: string) => {
  const locale = await getCurrentLocale();
  const translation = await getTrans(locale);

  try {
    const product = await db.product.findUnique({
      where: { id },
      include: {
        sizes: true,
        extras: true,
        Category: true,
      },
    });

    if (!product) {
      return {
        status: 404,
        message: translation.errors.unauthorized,
      };
    }

    return {
      status: 200,
      data: product,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translation.errors.somethingWentWrong,
    };
  }
};
//////////////////////
// Delete Product
////
export const deleteProduct = async (id: string) => {
  const locale = await getCurrentLocale();
  const translation = await getTrans(locale);
  try {
    await db.product.delete({
      where: {
        id,
      },
    });

    revalidatePath(`/${locale}/admin/products`);
    revalidatePath(`/${locale}/admin`);
    revalidatePath(`/${locale}/admin/categories`);

    return {
      status: 200,
      message: translation.messages.deleteSuccess,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: translation.errors.somethingWentWrong,
    };
  }
};
