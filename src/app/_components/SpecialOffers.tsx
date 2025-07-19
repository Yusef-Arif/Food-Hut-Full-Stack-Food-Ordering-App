import ProductCard from "@/components/ProductCard";
import { productWithRelations } from "@/lib/types";
import Image from "next/image";
import React from "react";

const SpecialOffers = ({ products }: { products: productWithRelations[] }) => {
  return products.length > 0 ? (
    <section className="relative py-20">
      <div className="container py-5">
        <div className="flex flex-col items-center justify-center text-center ">
          <h1 className="text-5xl font-bold mb-5">
            Today <span className="text-primary">special</span> offers
          </h1>
          <p className="text-muted max-w-[80%] text-xl mb-8">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s
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
        src="/assets/icons/decore1.png"
        alt="Decoration"
        width={20}
        height={20}
        className="object-contain size-40 absolute top-0 left-1"
      />
      <Image
        src="/assets/icons/decore2.png"
        alt="Decoration"
        width={20}
        height={20}
        className="object-contain size-30 absolute bottom-0 right-1"
      />
    </section>
  ) : (
    <div className="text-center py-20">
      <h2 className="text-3xl font-bold">No Special Offers Available</h2>
      <p className="text-muted mt-4">Check back later for exciting offers!</p>
    </div>
  );
};

export default SpecialOffers;
