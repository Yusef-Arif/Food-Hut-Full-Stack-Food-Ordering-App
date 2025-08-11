import { getProducts } from "@/server/db/products";
import React from "react";
import SpecialOffers from "../_components/SpecialOffers";

const page = async () => {
  const products = await getProducts();
  return (
    <main className="min-h-[100vh] flex items-center justify-center py-10">
      <SpecialOffers products={products} />
    </main>
  );
};

export default page;
