import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { getCurrentLocale } from "@/lib/getCurrentLocale ";
import getTrans from "@/lib/translation";
import { productWithRelations } from "@/lib/types";
import React from "react";

const Menu = async ({ products }: { products: productWithRelations[] }) => {
  const locale = await getCurrentLocale();
  const { menu } = await getTrans(locale);
  const categorys = [
    { name: "Pizza" },
    { name: "Burger" },
    { name: "Pasta" },
    { name: "Salad" },
    { name: "Dessert" },
    { name: "Beverages" },
  ];

  return (
    <section className=" py-20">
      <div className="container">
        <h1 className="text-5xl font-bold text-center">
          <span className="text-primary">{menu.title[0]}</span>{" "}
          {menu.title[1]}{" "}
          <span className="text-secondary">{menu.title[2]}</span>{" "}
          {menu.title[3]} <br /> {menu.title[4]}{" "}
          <span className="text-primary">{menu.title[5]} </span>
          {menu.title[6]} {menu.title[7]}
        </h1>

        <div className="flex justify-center items-center my-10">
          {categorys.map((category, index) => (
            <Button
              key={index}
              className="m-2"
              size="lg"
              variant={index === 0 ? "default" : "outline"}
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((offer) => (
            <div key={offer.id}>
              <ProductCard product={offer} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
