import { Blocks } from "lucide-react";
import React from "react";
import Categories from "./_components/categories";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import { getCategorysProducts } from "@/server/db/categorys";
import { CategoryForm } from "./_components/category-form";

const page = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params;
  const translations = await getTrans(locale);
  const categories = await getCategorysProducts();

  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className="heading">
          <Blocks /> {translations.dashboard.nav.allCategories}
        </h1>
        <div>
          <CategoryForm category={undefined} translations={translations} />
        </div>
      </div>
      <Categories categories={categories} locale={locale} />
    </section>
  );
};

export default page;
