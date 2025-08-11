import React from "react";
import ProductsTable from "./_components/products-table";
import { productWithRelations } from "@/lib/types";
import { ShoppingBag } from "lucide-react";
import getTrans from "@/lib/translation";
import { Locale } from "@/i18n.config";
import { getFilteredProducts } from "@/server/_actions/products";
import { FilterProducts } from "./_components/filter-products";
import { getCategorys } from "@/server/db/categorys";
import Search from "@/components/Search";

const page = async ({
  searchParams,
  params,
}: {
  searchParams: Promise<{
    page?: string;
    categoryId?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
  }>;
  params: Promise<{ locale: Locale }>;
}) => {
  const { locale } = await params;
  const translations = await getTrans(locale);
  const categories = await getCategorys();

  const { products, pagesCount, currentPage } = await getFilteredProducts({
    page: Number((await searchParams).page) || 1,
    limit: 5,
    minPrice: Number((await searchParams).minPrice),
    maxPrice: Number((await searchParams).maxPrice),
    categoryId: (await searchParams).categoryId,
    search: (await searchParams).search,
  });
  return (
    <section>
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-4xl font-bold  text-primary flex justify-start items-center gap-1.5">
          <ShoppingBag />
          {translations.dashboard.nav.products}
        </h1>
        <div className="flex gap-3 items-center ">
          <Search />
          <FilterProducts categories={categories} />
        </div>
      </div>

      <ProductsTable
        page={Number((await searchParams).page) || 1}
        currentPage={currentPage ?? 0}
        pagesCount={pagesCount ?? 0}
        products={products as productWithRelations[]}
        locale={locale}
      />
    </section>
  );
};

export default page;
