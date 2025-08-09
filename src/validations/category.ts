import { Translations } from "@/interfaces/translations";
import z from "zod";

export const categorySchema = (translation: Translations) => {
  return z.object({
    name: z.string().min(1, { message: translation.validation.required }),
  });
};
