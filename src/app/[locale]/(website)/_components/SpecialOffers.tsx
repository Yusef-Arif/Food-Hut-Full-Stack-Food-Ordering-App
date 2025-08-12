import ProductCard from "@/components/ProductCard";
import { getCurrentLocale } from "@/lib/getCurrentLocale ";
import getTrans from "@/lib/translation";
import { productWithRelations } from "@/lib/types";
import Image from "next/image";
import decore1Image from "@/../public/assets/icons/decore1.png";
import decore2Image from "@/../public/assets/icons/decore2.png";
import React from "react";
import { CarouselDemo } from "./CarouselDemo";

const SpecialOffers = async ({
  products,
}: {
  products: productWithRelations[];
}) => {
  const locale = await getCurrentLocale();
  const translation = await getTrans(locale);
  return products.length > 0 ? (
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="container px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex flex-col items-center justify-center text-center max-w-[90%] sm:max-w-[80%] mx-auto">
          <h1 className="text-2xl max-md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-5">
            {translation.offers.title.split(" ")[0]}{" "}
            <span className="text-primary">
              {translation.offers.title.split(" ")[1]}
            </span>{" "}
            {translation.offers.title.split(" ")[2]}
          </h1>
          <p className="text-muted text-base sm:text-lg md:text-xl mb-6 sm:mb-8">
            {translation.offers.description}
          </p>
        </div>

        <div className="hidden lg:grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 justify-items-center">
          {(products.slice(-4)).map((offer) => (
            <div key={offer.id}>
              <ProductCard product={offer} translation={translation} />
            </div>
          ))}
        </div>
      </div>

      <div className="lg:hidden">
        <CarouselDemo products={products} translation={translation} />
      </div>
      <Image
        src={decore1Image}
        alt="Decoration"
        width={20}
        height={20}
        className="object-contain w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 absolute top-0 left-1 opacity-50 sm:opacity-100"
      />
      <Image
        src={decore2Image}
        alt="Decoration"
        width={20}
        height={20}
        className="object-contain w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-30 lg:h-30 absolute bottom-0 right-1 opacity-50 sm:opacity-100"
      />
    </section>
  ) : (
    <div className="text-center py-10 sm:py-12 md:py-16 lg:py-20">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
        {translation.offers.noOffers}
      </h2>
      <p className="text-muted text-sm sm:text-base md:text-lg mt-2 sm:mt-3 md:mt-4">
        {translation.offers.checkBackLater}
      </p>
    </div>
  );
};

export default SpecialOffers;
