import { Translations } from "@/interfaces/translations";
import z from "zod";

const imageValidation = (translation: Translations, isRequired: boolean) => {
  return !isRequired
    ? z.custom((val) => val instanceof File)
    : z.custom(
        (val) => {
          if (typeof val !== "object" || !val) {
            return false;
          }
          if (!(val instanceof File)) {
            return false;
          }
          const imageTypes = ["image/jpeg", "image/png", "image/gif"];
          return imageTypes.includes(val.type);
        },
        { message: translation.errors.image }
      );
};

const productSchema = (translation: Translations) => {
  return {
    title: z.string().min(1, { message: translation.errors.name }),
    description: z
      .string()
      .min(1, { message: translation.errors.description }),
    basePrice: z.string().min(1, { message: translation.errors.price}),
    categoryId: z.string().min(1, { message: translation.errors.category }),
  };
};
export const addProductSchema = (translation: Translations) => {
  return z.object({
    ...productSchema(translation),
    image: imageValidation(translation, true),
  });
};

export const editProductSchema = (translation: Translations) => {
  return z.object({
    ...productSchema(translation),
    image: imageValidation(translation, false),
  });
};