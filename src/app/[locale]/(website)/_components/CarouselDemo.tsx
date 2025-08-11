import ProductCard from "@/components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Translations } from "@/interfaces/translations";
import { productWithRelations } from "@/lib/types";

export function CarouselDemo({
  products,
  translation,
}: {
  products: productWithRelations[];
  translation: Translations;
}) {
  return (
    <div className="px-4 sm:px-6 md:px-8">
      <Carousel
        className="w-full mx-auto"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((offer, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/2"
            >
              <div className="flex justify-center">
                <ProductCard product={offer} translation={translation} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious className="left-0 sm:-left-4 md:-left-6" />
          <CarouselNext className="right-0 sm:-right-4 md:-right-6" />
        </div>
      </Carousel>
    </div>
  );
}
