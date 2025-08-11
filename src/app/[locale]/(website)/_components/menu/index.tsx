
import { getCurrentLocale } from "@/lib/getCurrentLocale ";
import getTrans from "@/lib/translation";
import { categoryWithProducts } from "@/lib/types";
import { getCategorysProducts } from "@/server/db/categorys";
import React from "react";
import CategoryProducts from "./category-products";

const Menu = async () => {
  const locale = await getCurrentLocale();
  const translation = await getTrans(locale);
  const categories = (await getCategorysProducts()) as categoryWithProducts[];

  return (
    <section className=" py-20">
      <div className="container">
        <h1 className="max-md:text-4xl lg:text-5xl font-bold text-center">
          <span className="text-primary">{translation.menu.title[0]}</span>{" "}
          {translation.menu.title[1]}{" "}
          <span className="text-secondary">{translation.menu.title[2]}</span>{" "}
          {translation.menu.title[3]} <br /> {translation.menu.title[4]}{" "}
          <span className="text-primary">{translation.menu.title[5]} </span>
          {translation.menu.title[6]} {translation.menu.title[7]}
        </h1>

        <CategoryProducts categories={categories} translation={translation} />
      </div>
    </section>
  );
};

export default Menu;
