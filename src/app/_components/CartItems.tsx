"use client";

import { useAppSelector } from "@/hooks/redux";
import { currencyFormatter } from "@/lib/formatter";
import { cartProducts } from "@/redux/CartSlice";
import { Trash, X } from "lucide-react";
import Image from "next/image";

function CartItems() {
  const productsInCart = useAppSelector(cartProducts);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
      <div>
        {productsInCart.length > 0 ? (
          productsInCart.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-md flex gap-3 relative"
            >
              <div>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={130}
                  height={100}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-between">
                <h2 className="text-3xl font-bold text-primary">
                  {product.title}
                </h2>
                <p>Size: {product.size}</p>
                <p>Extras: {product.extra.join(", ")}</p>

                <p>{currencyFormatter(product.totalPrice)}</p>
              </div>
              <span className="absolute top-3 right-2 cursor-pointer text-red-500 hover:text-red-700 transition-all duration-300">
                <Trash />
              </span>
              <span className="absolute bottom-3 right-2 bg-secondary text-white px-2 py-1 rounded-full flex items-center gap-1">
                <X />
                {product.quantity}
              </span>
            </div>
          ))
        ) : (
          <p className="text-muted text-5xl text-center">Your cart is empty</p>
        )}
      </div>
      <div></div>
    </div>
  );
}

export default CartItems;
