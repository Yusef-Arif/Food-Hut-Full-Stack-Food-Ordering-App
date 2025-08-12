
import { categoryWithProducts } from "@/lib/types";
import React from "react";
import { CategoryForm } from "./category-form";

import { Translations } from "@/interfaces/translations";
import { DeleteCategory } from "./delete-category";

const Actions = ({ category, translations }: { category: categoryWithProducts, translations: Translations }) => {
  return (
    <div className="flex justify-center items-center">
      <CategoryForm category={category} translations={translations} />
      <DeleteCategory categoryId={category.id} translations={translations} />
    </div>
  );
};

export default Actions;
