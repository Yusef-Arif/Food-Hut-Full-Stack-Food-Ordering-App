"use server";

import { Locale } from "@/i18n.config";
import { getCurrentLocale } from "@/lib/getCurrentLocale ";
import getImageURL from "@/lib/getImageURL";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";

import { addUserSchema, editUserSchema } from "@/validations/user";
import { UserRoles } from "@prisma/client";
import { revalidatePath } from "next/cache";

export interface InitialState {
  message?: string;
  error?: Array<{ path: string[]; message: string }> | string;
  status: number;
  formData?: FormData;
}
export const createUser = async (prevState: unknown, formData: FormData) => {
  const locale = (await getCurrentLocale()) as Locale;
  const translaion = await getTrans(locale);
  const result = addUserSchema(translaion).safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) {
    return {
      error: JSON.parse(result.error.message),
      status: 400,
      formData,
    };
  }

  const data = result.data;
  const imageFile = data.image as File;
  const imageUrl = Boolean(imageFile.size)
    ? await getImageURL(imageFile, "profile")
    : undefined;

  try {
    const dbUser = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (dbUser) {
      return {
        message: translaion.errors.emailExists,
        status: 401,
        formData,
      };
    }

    await db.user.create({
      data: {
        ...data,
        image: imageUrl ?? "",
      },
    });

    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}/admin`);
    revalidatePath(`/${locale}/admin/users`);

    return {
      status: 200,
      message: translaion.messages.deleteSuccess,
    };
  } catch (error) {
    console.log(error);
    return {
      error: translaion.errors.somethingWentWrong,
      status: 500,
    };
  }
};

export const editCurrentUser = async (
  isAdmin: boolean,
  prevState: unknown,
  formData: FormData
) => {
  const locale = (await getCurrentLocale()) as Locale;
  const translaion = await getTrans(locale);
  const result = editUserSchema(translaion).safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) {
    return {
      error: JSON.parse(result.error.message),
      status: 400,
      formData,
    };
  }

  const data = result.data;
  const imageFile = data.image as File;
  const imageUrl = Boolean(imageFile.size)
    ? await getImageURL(imageFile, "profile")
    : undefined;

  try {
    const dbUser = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!dbUser) {
      return {
        message: translaion.errors.invalidCredentials,
        status: 401,
        formData,
      };
    }

    await db.user.update({
      where: {
        email: data.email,
      },
      data: {
        ...data,
        image: imageUrl ?? dbUser.image,
        role: isAdmin ? UserRoles.ADMIN : UserRoles.USER,
      },
    });

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}/admin`);
    revalidatePath(`/${locale}/admin/users`);

    return {
      status: 200,
      message: translaion.messages.updateSuccess,
    };
  } catch (error) {
    console.log(error);
    return {
      error: translaion.errors.somethingWentWrong,
      status: 500,
    };
  }
};

export const deleteUser = async (id: string) => {
  const locale = (await getCurrentLocale()) as Locale;
  const translation = await getTrans(locale);

  try {
    await db.user.delete({
      where: {
        id,
      },
    });

    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/admin/users`);

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
/////////////////////
//get Filtered Users
////
export const getFilteredUsers = async ({
  page = 1,
  limit = 10,
  role,
  search,
}: {
  page?: number;
  limit?: number;
  role?: string;
  search?: string;
}) => {
  const locale = (await getCurrentLocale()) as Locale;
  const translation = await getTrans(locale);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  if (role && role?.length > 0) {
    where.role = role;
  }

  if (search && search?.length > 0) {
    where.name = {
      contains: search.trim(),
      mode: "insensitive",
    };
  }

  try {
    const [users, totalCount] = await Promise.all([
      db.user.findMany({
        skip: (page - 1) * limit,
        where,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      db.user.count({ where }),
    ]);

    const pagesCount = Math.ceil(totalCount / limit);
    return { users, pagesCount, currentPage: page };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translation.errors.somethingWentWrong,
    };
  }
};
