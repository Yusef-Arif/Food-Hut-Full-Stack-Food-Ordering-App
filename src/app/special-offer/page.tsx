import SpecialOffers from "@/app/_components/SpecialOffers";
import { getProducts } from "@/server/db/products";
import React from "react";

const page = async () => {
  const products = await getProducts();
  return (
    <div>
      <SpecialOffers products={products} />
    </div>
  );
};

export default page;
