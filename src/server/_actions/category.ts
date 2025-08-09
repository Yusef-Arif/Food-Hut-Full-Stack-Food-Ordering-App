"use server";

import { getCurrentLocale } from "@/lib/getCurrentLocale ";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import { categorySchema } from "@/validations/category";
import { revalidatePath } from "next/cache";

/////////////////////
// Add Category
////
export const AddCategory = async (prevState: unknown, formData: FormData) => {
  const locale = await getCurrentLocale();
  const translation = await getTrans(locale);
  const result = categorySchema(translation).safeParse(
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

  try {
    const category = await db.category.findUnique({
      where: {
        name: data.name,
      },
    });

    if (category) {
      return {
        status: 409,
        message: translation.errors.emailExists,
      };
    }

    await db.category.create({
      data: {
        name: data.name,
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
/////////////////////
// Edit Category
////
export const EditCategory = async (
  categoryId: string,
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();
  const translation = await getTrans(locale);
  const result = categorySchema(translation).safeParse(
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

  try {
    const category = await db.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return {
        status: 409,
        message: translation.errors.emailExists,
      };
    }

    await db.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name: data.name,
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
/////////////////////
// delete Category
////
export const deleteCategory = async (categoryId: string) => {
  const locale = await getCurrentLocale();
  const translation = await getTrans(locale);

  try {
    const category = await db.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return {
        status: 400,
        message: translation.errors.emailExists,
      };
    }

    await db.category.delete({
      where: {
        id: categoryId,
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
