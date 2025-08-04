import { Translations } from "@/interfaces/translations";
import z from "zod";

export const editUserSchema = (translation: Translations) => {
  const egyptianPhoneRegex = /^(\+?20|0)?1[0-2,5]{1}[0-9]{8}$/;
  return z.object({
    name: z.string().trim().min(2, { message: translation.validation.nameMin }),
    email: z.string().trim().email({
      message: translation.validation.invalidEmail,
    }),
    phone: z
      .string()
      .regex(egyptianPhoneRegex, { message: translation.validation.phone }),
    streetAddress: z.string().optional(),
    postalCode: z
      .string()
      .optional()
      .refine(
        (value) => {
          if (!value) return true;
          return /^\d{5,10}$/.test(value);
        },
        {
          message: translation.validation.postalCode,
        }
      ),
    city: z.string().optional(),
    country: z.string().optional(),
    image: z.custom((val) => val instanceof File).optional(),
  });
};
