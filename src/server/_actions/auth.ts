"use server";

import { Locale } from "@/i18n.config";
import { getCurrentLocale } from "@/lib/getCurrentLocale ";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import {
  loginSchema,
  signUpSchema,
  ValidationErrors,
} from "@/validations/auth";
import bcrypt from "bcrypt";

export const LogIn = async (
  credentials: Record<"email" | "password", string>,
  locale: Locale
) => {
  const translaion = await getTrans(locale);
  const validation = loginSchema(translaion).safeParse(credentials);
  if (validation.success === false) {
    return {
      error: validation.error.message,
      status: 400,
    };
  }
  try {
    const user = await db.user.findUnique({
      where: {
        email: validation.data.email,
      },
    });

    if (!user) {
      return {
        message: translaion.errors.invalidCredentials,
        status: 401,
      };
    }

    const hashedPassword = user.password;
    const isPasswordValid = await bcrypt.compare(
      validation.data.password,
      hashedPassword
    );

    if (!isPasswordValid) {
      return {
        message: translaion.errors.invalidCredentials,
        status: 401,
      };
    }

    const { password, ...userData } = user;
    return {
      data: userData,
      message: translaion.messages.loginSuccess,
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      message: translaion.errors.somethingWentWrong,
      status: 500,
    };
  }
};

export type State =
  | {
      error: ValidationErrors;
      status: number;
      message?: undefined;
      user?: undefined;
    }
  | { message: string; status: number; error?: undefined; user?: undefined }
  | {
      status: number;
      user: { id: string; email: string; name: string };
      message: string;
      error?: undefined;
    };

export const SignUp = async (prevState: State, formData: FormData) => {
  const locale = await getCurrentLocale();
  const translation = await getTrans(locale);
  const validation = signUpSchema(translation).safeParse(
    Object.fromEntries(formData.entries())
  );

  if (validation.success === false) {
    return {
      error: JSON.parse(validation.error.message),
      status: 400,
    };
  }

  try {
    const user = await db.user.findUnique({
      where: {
        email: validation.data.email,
      },
    });

    if (user) {
      return {
        message: translation.errors.emailExists,
        status: 401,
      };
    }

    const hashedPassword = await bcrypt.hash(validation.data.password, 10);
    const createUser = await db.user.create({
      data: {
        name: validation.data.name,
        email: validation.data.email,
        password: hashedPassword,
      },
    });

    return {
      status: 201,
      user: {
        id: createUser.id,
        email: createUser.email,
        name: createUser.name,
      },
      message: translation.messages.registerSuccess,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: translation.errors.somethingWentWrong,
    };
  }
};
