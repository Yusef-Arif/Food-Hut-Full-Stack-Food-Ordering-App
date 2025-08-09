import { IFormField, IFormFieldsVariables } from "@/interfaces/fields";
import { Translations } from "@/interfaces/translations";
interface props extends IFormFieldsVariables {
  translations: Translations;
}

const useFormFields = ({ slug, translations }: props) => {
  const loginFields = (): IFormField[] => [
    {
      label: translations.labels.email,
      name: "email",
      type: "email",
      id: "email",
      autoFocus: true,
      placeholder: translations.placeholders.email,
    },
    {
      label: translations.labels.password,
      name: "password",
      type: "password",
      id: "password",
      placeholder: translations.placeholders.password,
    },
  ];

  const signUpFields = (): IFormField[] => [
    {
      label: translations.labels.name,
      name: "name",
      type: "text",
      id: "name",
      autoFocus: true,
      placeholder: translations.placeholders.name,
    },
    {
      label: translations.labels.email,
      name: "email",
      type: "email",
      id: "email",
      placeholder: translations.placeholders.email,
    },
    {
      label: translations.labels.password,
      name: "password",
      type: "password",
      id: "password",
      placeholder: translations.placeholders.password,
    },
    {
      label: translations.labels.confirmPassword,
      name: "confirmPassword",
      type: "password",
      id: "confirmPassword",
      placeholder: translations.placeholders.confirmPassword,
    },
  ];

  const editUserFields = (): IFormField[] => [
    {
      label: translations.labels.name,
      name: "name",
      type: "text",
      id: "name",
      autoFocus: true,
      placeholder: translations.placeholders.name,
    },
    {
      label: translations.labels.email,
      name: "email",
      type: "email",
      id: "email",
      placeholder: translations.placeholders.email,
    },
    {
      label: translations.fields.phone,
      name: "phone",
      type: "text",
      id: "phone",
      placeholder: translations.placeholders.phone,
    },
    {
      label: translations.fields.streetAddress,
      name: "streetAddress",
      type: "text",
      id: "streetAddress",
      placeholder: translations.placeholders.streetAddress,
    },
    {
      label: translations.fields.postalCode,
      name: "postalCode",
      type: "text",
      id: "postalCode",
      placeholder: translations.placeholders.postalCode,
    },
    {
      label: translations.fields.city,
      name: "city",
      type: "text",
      id: "city",
      placeholder: translations.placeholders.city,
    },
    {
      label: translations.fields.country,
      name: "country",
      type: "text",
      id: "country",
      placeholder: translations.placeholders.country,
    },
  ];

  const addUserFields = (): IFormField[] => [
    ...editUserFields(),
    {
      label: translations.labels.password,
      name: "password",
      type: "password",
      id: "password",
      placeholder: translations.placeholders.password,
    },
  ];

  const addProductFields = (): IFormField[] => [
    {
      label: translations.labels.title,
      name: "title",
      type: "text",
      id: "title",
      autoFocus: true,
      placeholder: translations.placeholders.title,
    },
    {
      label: translations.labels.description,
      name: "description",
      type: "textarea",
      id: "description",
      placeholder: translations.placeholders.description,
    },
    {
      label: translations.labels.basePrice,
      name: "basePrice",
      type: "number",
      id: "basePrice",
      placeholder: translations.placeholders.basePrice,
    },
  ];

  const getFields = (): IFormField[] => {
    switch (slug) {
      case "login":
        return loginFields();
      case "signUp":
        return signUpFields();
      case "editUser":
        return editUserFields();
      case "addProduct":
        return addProductFields();
      case "addUser":
        return addUserFields();

      default:
        return [];
    }
  };

  return { getFields };
};

export default useFormFields;
