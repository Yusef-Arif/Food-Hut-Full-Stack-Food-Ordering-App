"use client";
import React from "react";
import { TableCell } from "../ui/table";
import { ShowDialog } from "./show-dialog";
import { productWithRelations } from "@/lib/types";
import { Category, User } from "@prisma/client";
import { EditProduct, EditUser } from "./edit-dialog";
import { Translations } from "@/interfaces/translations";
import DeleteAction from "./delete-action";

const Actions = ({
  data,
  translations,
  slug,
  categories,
}: {
  data: productWithRelations | User;
  translations: Translations;
  slug: string | undefined;
  categories?: Category[];
}) => {
  const isUserMode = slug === "user";
  return (
    <TableCell className="text-right space-x-2">
      <ShowDialog data={data} translations={translations} />

      {isUserMode ? (
        <EditUser translations={translations} user={data as User} />
      ) : (
        <EditProduct
          translations={translations}
          product={data as productWithRelations}
          categories={categories ?? []}
        />
      )}

      <DeleteAction id={data.id} translations={translations} slug={slug} />
    </TableCell>
  );
};

export default Actions;
