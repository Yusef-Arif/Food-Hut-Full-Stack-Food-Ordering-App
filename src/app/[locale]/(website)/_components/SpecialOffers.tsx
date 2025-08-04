import ProductCard from "@/components/ProductCard";
import { getCurrentLocale } from "@/lib/getCurrentLocale ";
import getTrans from "@/lib/translation";
import { productWithRelations } from "@/lib/types";
import Image from "next/image";
import decore1Image from "@/../public/assets/icons/decore1.png";
import decore2Image from "@/../public/assets/icons/decore2.png";
import React from "react";

const SpecialOffers = async ({
  products,
}: {
  products: productWithRelations[];
}) => {
  const locale = await getCurrentLocale();
  const { offers } = await getTrans(locale);
  return products.length > 0 ? (
    <section className="relative py-20">
      <div className="container py-5">
        <div className="flex flex-col items-center justify-center text-center ">
          <h1 className="text-5xl font-bold mb-5">
            {offers.title.split(" ")[0]}{" "}
            <span className="text-primary">{offers.title.split(" ")[1]}</span>{" "}
            {offers.title.split(" ")[2]}
          </h1>
          <p className="text-muted max-w-[80%] text-xl mb-8">
            {offers.description}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((offer) => (
            <div key={offer.id}>
              <ProductCard product={offer} />
            </div>
          ))}
        </div>
      </div>
      <Image
        src={decore1Image}
        alt="Decoration"
        width={20}
        height={20}
        className="object-contain size-40 absolute top-0 left-1"
      />
      <Image
        src={decore2Image}
        alt="Decoration"
        width={20}
        height={20}
        className="object-contain size-30 absolute bottom-0 right-1"
      />
    </section>
  ) : (
    <div className="text-center py-20">
      <h2 className="text-3xl font-bold">{offers.noOffers}</h2>
      <p className="text-muted mt-4">{offers.checkBackLater}</p>
    </div>
  );
};

export default SpecialOffers;
