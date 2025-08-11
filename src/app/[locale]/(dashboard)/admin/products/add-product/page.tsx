import React from "react";
import ProductForm from "../_components/product-form";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import { getCategorys } from "@/server/db/categorys";
import { Category } from "@prisma/client";
import { Plus } from "lucide-react";

const page = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params;
  const translations = await getTrans(locale);
  const categorys: Category[] = await getCategorys();
  return (
    <main>
      <h1 className="heading">
        <Plus />
        {translations.dashboard.nav.createProduct}
      </h1>
      <div className="md:mx-10 lg:mx-20 mt-6">
        <ProductForm
          translations={translations}
          categorys={categorys}
          product={undefined}
        />
      </div>
    </main>
  );
};

export default page;
