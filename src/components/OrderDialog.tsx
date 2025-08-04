"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { productWithRelations } from "@/lib/types";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { currencyFormatter } from "@/lib/formatter";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addToCart, cartProducts } from "@/redux/CartSlice";
import { Minus, Plus } from "lucide-react";

export function OrderDialog({ product }: { product: productWithRelations }) {
  const productsInCart = useAppSelector(cartProducts);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const defaultChoices = productsInCart.find((item) => item.id === product.id);
  const [size, setSize] = useState<string>();
  const [extra, setExtra] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(productsInCart));
  }, [productsInCart]);

  useEffect(() => {
    if (defaultChoices) {
      setSize(defaultChoices.size);
      setExtra(defaultChoices.extra);
      setQuantity(defaultChoices.quantity);
    }
  }, [defaultChoices]);

  const handelSubmit = () => {
    if (!size) {
      setError("Please select a size.");
      return;
    }

    const sizePrice = product.sizes.find((s) => s.name === size)?.price || 0;
    const extraPrice = extra.reduce((total, item) => {
      const found = product.extras.find((e) => e.name === item);
      return total + (found?.price || 0);
    }, 0);

    setError(null);
    dispatch(
      addToCart({
        id: product.id,
        image: product.image,
        title: product.title,
        description: product.description,
        totalPrice: (product.basePrice + sizePrice + extraPrice) * quantity,
        extra: extra,
        size: size,
        quantity: quantity,
      })
    );

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="absolute bottom-[-15px] left-[50%] translate-x-[-50%]"
          size="lg"
        >
          Order Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex items-center justify-center flex-col">
          <Image
            src={product.image}
            alt="order image"
            width={200}
            height={200}
            className="object-contain size-40 rounded-full"
          />
          <DialogTitle className="text-lg font-semibold text-primary">
            {product.title}
          </DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </DialogHeader>
        <div>
          <h1 className="text-2xl font-semibold">Choose the Size?</h1>
          <Sizes sizes={product.sizes} size={size} setSize={setSize} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Any Extras?</h1>
          <Extras extras={product.extras} extra={extra} setExtra={setExtra} />
        </div>
        <div className="flex items-center justify-center gap-3">
          <Plus
            size={40}
            onClick={() => setQuantity(quantity + 1)}
            className="cursor-pointer bg-secondary text-white p-2 rounded-xl"
          />
          <p className="text-2xl font-semibold select-none">
            Quantity: <span className="text-primary font-bold">{quantity}</span>{" "}
          </p>
          <Minus
            size={40}
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            className="cursor-pointer bg-secondary text-white p-2 rounded-xl"
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <DialogFooter>
          <Button onClick={handelSubmit} size="lg" className="w-full">
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Sizes({
  sizes,
  size,
  setSize,
}: {
  sizes: { id: string; name: string; price: number }[];
  size: string | undefined;
  setSize: (size: string) => void;
}) {
  return (
    <RadioGroup defaultValue={size ? size : "comfortable"} value={size}>
      <div className="grid grid-cols-3 gap-4 my-3">
        {sizes.map((s) => (
          <div key={s.id} className="flex items-center gap-3">
            <RadioGroupItem
              value={s.name}
              id={s.id}
              onClick={() => (s.name === size ? setSize("") : setSize(s.name))}
            />
            <Label htmlFor={s.id} className="cursor-pointer text-lg">
              {s.name}{" "}
              <span className="font-bold">{currencyFormatter(s.price)}</span>
            </Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
}

function Extras({
  extras,
  extra,
  setExtra,
}: {
  extras: { id: string; name: string; price: number }[];
  extra: string[];
  setExtra: (extra: string[]) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-4 my-3">
      {extras.map((e) => (
        <div key={e.id} className="flex items-center gap-3">
          <Checkbox
            id={e.id}
            checked={extra.includes(e.name)}
            onCheckedChange={(checked) => {
              if (checked) {
                setExtra([...extra, e.name]);
              } else {
                setExtra(extra.filter((item) => item !== e.name));
              }
            }}
          />
          <Label htmlFor={e.id}>
            {e.name}
            <span className="font-bold">{currencyFormatter(e.price)}</span>
          </Label>
        </div>
      ))}
    </div>
  );
}
