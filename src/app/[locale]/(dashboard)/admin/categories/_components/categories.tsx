import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { categoryWithProducts } from "@/lib/types";
import ProductsTable from "../../products/_components/products-table";
import { Locale } from "@/i18n.config";
import Actions from "./Actions";

const Categories = ({
  categories,
  locale,
}: {
  categories: categoryWithProducts[];
  locale: Locale;
}) => {
  return (
    <div>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-0"
      >
        <div className="flex flex-col gap-4 mt-5">
          {categories.map((category, index) => {
            return (
              <AccordionItem
                value={`item-${index}`}
                className="w-full"
                key={index}
              >
                <div key={index} className="flex gap-2">
                  <div className="w-full">
                    <AccordionTrigger className="bg-primary text-white">
                      <span className="px-3 font-2xl font-semibold">
                        {category.name}
                      </span>
                    </AccordionTrigger>
                  </div>
                  <Actions category={category} />
                </div>
                <AccordionContent>
                  {category.product.length > 0 ? (
                    <ProductsTable
                      products={category.product}
                      locale={locale}
                    />
                  ) : (
                    <p className="text-muted text-center my-3 text-lg font-serif">
                      There is no Products For this category yet
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </div>
      </Accordion>
    </div>
  );
};

export default Categories;
