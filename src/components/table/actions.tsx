import React from "react";
import { TableCell } from "../ui/table";
import { ShowDialog } from "./show-dialog";
import { productWithRelations } from "@/lib/types";
import { User } from "@prisma/client";
import { EditProduct, EditUser } from "./edit-dialog";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import DeleteAction from "./delete-action";

const Actions = async ({
  data,
  locale,
  slug,
}: {
  data: productWithRelations | User;
  locale: Locale;
  slug: string | undefined;
}) => {
  const isUserMode = slug === "user";
  const translations = await getTrans(locale);
  return (
    <TableCell className="text-right space-x-2">
      <ShowDialog data={data} translations={translations}/>

        {isUserMode ? (
          <EditUser translations={translations} user={data as User} />
        ) : (
          <EditProduct
            translations={translations}
            product={data as productWithRelations}
          />
        )}

      <DeleteAction id={data.id} translations={translations} slug={slug} />
    </TableCell>
  );
};

export default Actions;
