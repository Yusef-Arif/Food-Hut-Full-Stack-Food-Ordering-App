"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { currencyFormatter } from "@/lib/formatter";
import {
  cartProducts,
  decreaseQuantity,
  deleteItem,
  increaseQuantity,
} from "@/redux/CartSlice";
import { Minus, Plus, Trash, X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

function CartItems() {
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
              <p>
                Extras:{" "}
                {product.extra.length > 0
                  ? product.extra.join(", ")
                  : "No Extras"}
              </p>

              <p>{currencyFormatter(product.totalPrice)}</p>
            </div>
            <span
              onClick={() => dispatch(deleteItem(product.id))}
              className="absolute top-3 right-2 cursor-pointer text-red-500 hover:text-red-700 transition-all duration-300"
            >
              <Trash />
            </span>
            <div className="absolute bottom-3 right-4 flex gap-2">
              <Button
                size="sm"
                onClick={() => dispatch(increaseQuantity(product.id))}
              >
                <Plus />
              </Button>
              <span className="bg-secondary text-white px-2 py-1 rounded-full flex items-center gap-1">
                <X />
                {product.quantity}
              </span>
              <Button
                size="sm"
                onClick={() => dispatch(decreaseQuantity(product.id))}
              >
                <Minus />
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted text-5xl text-center">Your cart is empty</p>
      )}
    </>
  );
}

export default CartItems;
