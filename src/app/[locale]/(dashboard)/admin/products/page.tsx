import React from "react";
import ProductsTable from "./_components/products-table";
import { getProducts } from "@/server/db/products";
import { productWithRelations } from "@/lib/types";
import { ShoppingBag } from "lucide-react";
// import { AddProduct } from "./_components/add-product";

const page = async () => {
  const products: productWithRelations[] = await getProducts();
  return (
    <section>
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold mb-3 text-primary flex justify-start items-center gap-1.5">
          <ShoppingBag />
          Products
        </h1>
        {/* <AddProduct/> */}
      </div>

      <ProductsTable products={products} />
    </section>
  );
};

export default page;
