"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Translations } from "@/interfaces/translations";
import { currencyFormatter } from "@/lib/formatter";
import {
  cartProducts,
  decreaseQuantity,
  deleteItem,
  increaseQuantity,
} from "@/redux/CartSlice";
import { Minus, Plus, ShoppingBasket, Trash, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

function CartItems({ translation }: { translation: Translations }) {
  const { locale } = useParams();
  const productsInCart = useAppSelector(cartProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(productsInCart));
  }, [productsInCart]);
  return (
    <>
      {productsInCart.length > 0 ? (
        productsInCart.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-md flex gap-3 max-md:mb-7 relative"
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
              <p>
                {translation.labels.size}: {product.size}
              </p>
              <p>
                {translation.labels.extra}:{" "}
                {product.extra.length > 0
                  ? product.extra.join(", ")
                  : "No Extras"}
              </p>

              <p>{currencyFormatter(product.totalPrice)}</p>
            </div>
            <span
              onClick={() => {
                dispatch(deleteItem(product.id));
                toast.success(translation.messages.removeFromCart);
              }}
              className={`absolute top-3 ${
                locale === "ar" ? "left-2" : "right-2"
              } cursor-pointer text-red-500 hover:text-red-700 transition-all duration-300`}
            >
              <Trash />
            </span>
            <div
              className={`absolute bottom-3 ${
                locale === "ar" ? "left-4" : "right-4"
              } flex gap-1 sm:gap-2`}
            >
              <Button
                size="sm"
                className="h-7 w-7 sm:h-8 sm:w-8"
                onClick={() => dispatch(increaseQuantity(product.id))}
              >
                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <span className="bg-secondary text-white px-1.5 sm:px-2 py-1 rounded-full flex items-center gap-0.5 sm:gap-1 text-sm sm:text-base">
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
                {product.quantity}
              </span>
              <Button
                size="sm"
                className="h-7 w-7 sm:h-8 sm:w-8"
                onClick={() => dispatch(decreaseQuantity(product.id))}
              >
                <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex  items-center justify-center h-full py-10">
          <p className="text-muted text-3xl text-center">
            <ShoppingBasket className="inline-block mx-2" size={40} />
            {translation.messages.emptyCart}
          </p>
        </div>
      )}
    </>
  );
}

export default CartItems;
