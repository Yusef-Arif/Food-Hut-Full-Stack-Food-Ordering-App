"use client";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Translations } from "@/interfaces/translations";
import { categoryWithProducts } from "@/lib/types";
import { ChevronRight, OctagonAlert } from "lucide-react";
import React, { useState } from "react";
import { CarouselDemo } from "../CarouselDemo";
import Link from "@/components/Link";
import { useParams } from "next/navigation";

const CategoryProducts = ({
  categories,
  translation,
}: {
  categories: categoryWithProducts[];
  translation: Translations;
}) => {
  const [Category, setCategory] = useState<categoryWithProducts | null>(
    categories[0] || null
  );
  const { locale } = useParams();

  return (
    <div>
      <div className="flex justify-center items-center my-10">
        {categories.map((category, index) => (
          <Button
            key={index}
            className="m-2"
            size="lg"
            variant={category.id === Category?.id ? "default" : "outline"}
            onClick={() => setCategory(category)}
            data-aos="fade-up"
            data-aos-delay={`${index * 100}`}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {Category && Category.product.length === 0 ? (
        <div className="min-h-[50vh] flex items-center justify-center">
          <h2 className="text-2xl font-semibold flex gap-2 items-center">
            <OctagonAlert size={30} className="text-primary" />
            {translation.messages.noProducts}
          </h2>
        </div>
      ) : (
        <div>
          <div className="max-md:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {Category?.product.slice(0, 4).map((product: any) => (
              <div key={product.id}>
                <ProductCard product={product} translation={translation} />
              </div>
            ))}
          </div>

          <div className="lg:hidden">
            <CarouselDemo
              products={Category?.product ?? []}
              translation={translation}
            />
          </div>

          <Link
            href={`/${locale}/menu?categoryId=${Category?.id}`}
            className="mt-14 w-full flex items-center justify-center"
          >
            <Button
              size="lg"
              variant="outline"
              className="flex gap-2 items-center"
            >
              <ChevronRight /> {translation.labels.viewMore}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
