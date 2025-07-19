import { OrderDialog } from "./OrderDialog";
import Image from "next/image";
import { currencyFormatter } from "@/lib/formatter";
import { AvatarDemo } from "./Avatar";
import StarFilled from "./Star";
import { productWithRelations } from "@/lib/types";

const ProductCard = ({ product }: { product: productWithRelations }) => {
  return (
    <div className="gradiant-bottom rounded-t-full p-5 rounded-b-2xl relative pb-10 md:w-[250px]">
      <div className="relative flex items-center justify-center mb-4">
        <Image
          src={product.image}
          alt={product.title}
          width={500}
          height={300}
          className="object-contain size-max rounded-full mb-4"
        />
        <div className="bg-secondary w-18 h-18 flex items-center justify-center rounded-full border-4 border-white absolute bottom-2 right-2">
          <strong className=" font-bold">
            {currencyFormatter(product.basePrice)}
          </strong>
        </div>
      </div>
      <div className="flex items-center justify-center mb-4 gap-2">
        <AvatarDemo />
        <StarFilled /> (4.6)
      </div>
      <div className="flex flex-col items-center justify-center w-full text-center">
        <h1 className="text-primary font-semibold text-xl">{product.title}</h1>
        <p className="text-muted">{product.description}</p>
      </div>
      <OrderDialog product={product} />
    </div>
  );
};

export default ProductCard;
