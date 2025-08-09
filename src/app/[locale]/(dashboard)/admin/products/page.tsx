import React from "react";
import ProductsTable from "./_components/products-table";
import { getProducts } from "@/server/db/products";
import { productWithRelations } from "@/lib/types";
import { ShoppingBag } from "lucide-react";
import getTrans from "@/lib/translation";
import { Locale } from "@/i18n.config";

const page = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const products: productWithRelations[] = await getProducts();
  const { locale } = await params;
  const translations = await getTrans(locale);
  return (
    <section>
      <h1 className="text-4xl font-bold mb-3 text-primary flex justify-start items-center gap-1.5">
        <ShoppingBag />
        {translations.dashboard.nav.products}
      </h1>

      <ProductsTable products={products} locale={locale} />
    </section>
  );
};

export default page;
