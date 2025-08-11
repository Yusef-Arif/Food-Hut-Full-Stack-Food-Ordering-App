import React from "react";
import Products from "./_components/Products";
import Filter from "./_components/Filter";
import { getFilteredProducts } from "@/server/_actions/products";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
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
  const translation = await getTrans(locale);

  const { products, pagesCount, currentPage } = await getFilteredProducts({
    page: Number((await searchParams).page) || 1,
    limit: 12,
    minPrice: Number((await searchParams).minPrice),
    maxPrice: Number((await searchParams).maxPrice),
    categoryId: (await searchParams).categoryId,
    search: (await searchParams).search,
  });
  return (
    <section className="min-h-[100vh] py-20">
      <div className="container">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-primary">Menu</h1>
          <Search />
        </div>
        <div className="flex gap-5 my-6">
          <Filter />

          <Products
            page={Number((await searchParams).page) || 1}
            currentPage={currentPage}
            pagesCount={pagesCount}
            products={products}
            translation={translation}
          />
        </div>
      </div>
    </section>
  );
};

export default page;
