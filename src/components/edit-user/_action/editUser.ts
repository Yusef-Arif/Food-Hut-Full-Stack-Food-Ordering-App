"use server";

import { Locale } from "@/i18n.config";
import { getCurrentLocale } from "@/lib/getCurrentLocale ";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import { ValidationErrors } from "@/validations/auth";
import { editUserSchema } from "@/validations/editUser";
import { UserRoles } from "@prisma/client";
import { revalidatePath } from "next/cache";

export interface InitialState {
  message?: string;
  error?: ValidationErrors;
  status?: number | null;
  formData?: FormData | null;
}
const editUser = async (
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
      error: result.error.message,
      status: 400,
      formData,
    };
  }

  const data = result.data;
  const imageFile = data.image as File;
  const imageUrl = Boolean(imageFile.size)
    ? await getImageUrl(imageFile)
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
        error: 401,
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
    // revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`);
    // revalidatePath(
    //   `/${locale}/${Routes.ADMIN}/${Pages.USERS}/${user.id}/${Pages.EDIT}`
    // );

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

const getImageUrl = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("pathName", "profile_images");

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/upload`, {
      method: "POST",
      body: formData,
    });

    const image = (await res.json()) as { url: string };
    return image.url;
  } catch (error) {
    console.log("something went wrong on uploading image", error);
  }
};

export default editUser;
