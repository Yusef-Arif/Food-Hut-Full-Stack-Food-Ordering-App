
import { getProducts } from "@/server/db/products";
import React from "react";
import SpecialOffers from "../_components/SpecialOffers";

const page = async () => {
  const products = await getProducts();
  return (
    <div>
      <SpecialOffers products={products} />
    </div>
  );
};

export default page;
