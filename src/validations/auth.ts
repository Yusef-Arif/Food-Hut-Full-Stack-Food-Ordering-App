import { Translations } from "@/interfaces/translations";
import * as z from "zod";

export const loginSchema = (translation: Translations) => {
  return z.object({
    email: z
      .string()
      .trim()
      .email({ message: translation.validation.invalidEmail }),
    password: z
      .string()
      .min(6, { message: translation.validation.passwordMin })
      .max(40, { message: translation.validation.passwordMax }),
  });
};

export const signUpSchema = (translation: Translations) => {
  return z
    .object({
      name: z
        .string()
        .trim()
        .min(2, { message: translation.validation.nameMin }),
      email: z
        .string()
        .trim()
        .email({ message: translation.validation.invalidEmail }),
      password: z
        .string()
        .min(6, { message: translation.validation.passwordMin })
        .max(40, { message: translation.validation.passwordMax }),
      confirmPassword: z
        .string()
        .min(6, { message: translation.validation.passwordMin })
        .max(40, { message: translation.validation.passwordMax }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: translation.validation.passwordsNotMatch,
    });
};

export type ValidationErrors =
  | {
      [key: string]: string[];
    }
  | undefined;
