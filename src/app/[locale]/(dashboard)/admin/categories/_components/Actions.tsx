
import { categoryWithProducts } from "@/lib/types";
import React from "react";
import { CategoryForm } from "./category-form";
import {DelteCategory} from "./delete-category";

const Actions = ({ category }: { category: categoryWithProducts }) => {
  return (
    <div className="flex justify-center items-center">
      <CategoryForm category={category} />
      <DelteCategory categoryId={category.id} />
    </div>
  );
};

export default Actions;
