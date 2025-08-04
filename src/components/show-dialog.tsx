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
import { currencyFormatter } from "@/lib/formatter";
import { productWithRelations } from "@/lib/types";
import { User } from "@prisma/client";
import { Eye, UserIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function ShowDialog({ data }: { data: productWithRelations | User }) {
  const [close, setClose] = useState(false);
  const isProduct = "title" in data;
  const Details = isProduct
    ? [
        {
          basePrice: currencyFormatter(data.basePrice),
        },

        {
          category: data.Category.name,
        },
        {
          order: data.order,
        },
        {
          extras:
            data.extras.map((extra) => extra.name).join(", ") ||
            "there are no extras",
        },
        {
          sizes:
            data.sizes.map((size) => size.name).join(", ") ||
            "there are no sizes",
        },
        {
          createdAt: new Date(data.createdAt).toLocaleString(),
        },
        {
          updatedAt: new Date(data.updatedAt).toLocaleString(),
        },
      ]
    : [
        {
          role: data.role,
        },
        {
          phone: data.phone || "No phone provided",
        },
        {
          city: data.city || "No city provided",
        },
        {
          country: data.country || "No country provided",
        },
        {
          postalCode: data.postalCode || "No postal code provided",
        },
        {
          createdAt: new Date(data.createdAt).toLocaleString(),
        },
        {
          updatedAt: new Date(data.updatedAt).toLocaleString(),
        },
      ];
  return (
    <Dialog open={close} onOpenChange={setClose}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-green-500">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[430px]">
        <DialogHeader className="flex justify-center items-center">
          <DialogTitle className="text-lg font-bold text-primary">
            {isProduct ? data.title : data.name}
          </DialogTitle>
          <DialogDescription>
            {isProduct ? data.description : data.email}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-start items-start gap-4">
          {data.image ? (
            <Image
              src={data.image}
              alt={isProduct ? data.title : data.name}
              width={100}
              height={100}
              className="rounded-md object-cover"
            />
          ) : (
            <UserIcon className="rounded-md object-cover w-[100px] h-[100px]" />
          )}
          <div>
            {Details.map((detail, index) => (
              <h1 key={index} className="text-lg">
                <span className="text-primary font-bold">
                  {Object.keys(detail)[0]}:
                </span>{" "}
                {Object.values(detail)[0]}
              </h1>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="w-full"
            onClick={() => setClose(false)}
          >
            Ok
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
