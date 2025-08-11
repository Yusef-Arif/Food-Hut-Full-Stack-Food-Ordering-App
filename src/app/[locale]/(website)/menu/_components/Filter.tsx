import { getCategorys } from "@/server/db/categorys";
import { FilterIcon } from "lucide-react";
import React from "react";
import CategoryFilter from "./category-filter";
import PriceFilter from "./price-filter";

const Filter = async () => {
  const categories = await getCategorys();
  return (
    <div
      className="border rounded-2xl border-primary p-3 w-[250px] h-fit bg-white/5"
    >
      <h1 className="heading">
        <FilterIcon />
        Filter
      </h1>

      <CategoryFilter categories={categories} />
      <PriceFilter />
    </div>
  );
};

export default Filter;
