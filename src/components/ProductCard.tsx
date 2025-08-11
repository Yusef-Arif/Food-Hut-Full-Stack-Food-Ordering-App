"use client";
import { OrderDialog } from "./OrderDialog";
import Image from "next/image";
import { currencyFormatter } from "@/lib/formatter";
import { AvatarDemo } from "./Avatar";
import StarFilled from "./Star";
import { productWithRelations } from "@/lib/types";
import { Translations } from "@/interfaces/translations";

const ProductCard = ({
  product,
  translation,
}: {
  product: productWithRelations;
  translation: Translations;
}) => {
  return (
    <div
      className="gradiant-bottom !rounded-b-2xl rounded-t-full p-3 sm:p-4 md:p-5 relative pb-8 md:pb-10 w-[200px] sm:w-[220px] md:w-[250px] max-md:mx-auto my-4"
      data-aos="fade-up"
    >
      <div className="relative flex items-center justify-center mb-3 md:mb-4">
        <Image
          src={product.image}
          alt={product.title}
          width={500}
          height={300}
          className="object-cover bg-center rounded-full mb-3 md:mb-4 w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] md:w-[220px] md:h-[220px]"
        />
        <div className="bg-secondary w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 flex items-center justify-center rounded-full border-4 border-white absolute bottom-2 right-2">
          <strong className="text-sm sm:text-base md:text-lg font-bold">
            {currencyFormatter(product.basePrice)}
          </strong>
        </div>
      </div>
      <div className="flex items-center justify-center mb-3 md:mb-4 gap-1 sm:gap-2">
        <AvatarDemo />
        <StarFilled /> <span className="text-sm sm:text-base">(4.6)</span>
      </div>
      <div className="flex flex-col items-center justify-center w-full text-center rounded-b-2xl">
        <h1 className="text-primary font-semibold text-base sm:text-lg md:text-xl mb-1">
          {product.title}
        </h1>
        <p className="text-muted text-sm sm:text-base line-clamp-2">
          {product.description}
        </p>
      </div>
      <OrderDialog product={product} translation={translation} />
    </div>
  );
};

export default ProductCard;
