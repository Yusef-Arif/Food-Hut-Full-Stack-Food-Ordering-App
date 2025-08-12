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
import { Translations } from "@/interfaces/translations";
import { currencyFormatter } from "@/lib/formatter";
import { productWithRelations } from "@/lib/types";
import { User } from "@prisma/client";
import { Eye, UserIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function ShowDialog({
  data,
  translations,
}: {
  data: productWithRelations | User;
  translations: Translations;
}) {
  const [close, setClose] = useState(false);
  const isProduct = "title" in data;
  const Details = isProduct
    ? [
        {
          title: translations.labels.basePrice,
          value: currencyFormatter(data.basePrice),
        },

        {
          title: translations.labels.category,
          value: data.Category.name,
        },
        {
          title: translations.labels.order,
          value: data.order,
        },
        {
          title: translations.labels.extra,
          value:
            data.extras.map((extra) => extra.name).join(", ") ||
            translations.messages.notExtras,
        },
        {
          title: translations.labels.size,
          value:
            data.sizes.map((size) => size.name).join(", ") ||
            translations.messages.notSizes,
        },
        {
          title: translations.labels.createdAt,
          value: new Date(data.createdAt).toLocaleString(),
        },
        {
          title: translations.labels.updatedAt,
          value: new Date(data.updatedAt).toLocaleString(),
        },
      ]
    : [
        {
          title: translations.labels.role,
          value: data.role,
        },
        {
          title: translations.fields.phone,
          value: data.phone || translations.messages.notProvided,
        },
        {
          title: translations.fields.city,
          value: data.city || translations.messages.notProvided,
        },
        {
          title: translations.fields.country,
          value: data.country || translations.messages.notProvided,
        },
        {
          title: translations.fields.postalCode,
          value: data.postalCode || translations.messages.notProvided,
        },
        {
          title: translations.labels.email,
          value: data.email || translations.messages.notProvided,
        },
        {
          title: translations.labels.createdAt,
          value: new Date(data.createdAt).toLocaleString(),
        },
        {
          title: translations.labels.updatedAt,
          value: new Date(data.updatedAt).toLocaleString(),
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
        <div className="flex flex-col justify-start items-start gap-4">
          <div className="flex justify-center items-center w-full">
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
          </div>
          <div>
            {Details.map((detail, index) => (
              <h1 key={index} className="text-lg">
                <span className="text-primary font-bold">{detail.title}:</span>{" "}
                {detail.value}
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
            {translations.labels.ok}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
