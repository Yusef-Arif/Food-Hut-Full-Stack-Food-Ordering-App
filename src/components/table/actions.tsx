import React from "react";
import { TableCell } from "../ui/table";
import { Button } from "../ui/button";
import { Edit, Trash } from "lucide-react";
import { ShowDialog } from "../show-dialog";
import { productWithRelations } from "@/lib/types";
import { User } from "@prisma/client";

const Actions = ({ show }: { show: productWithRelations | User }) => {
  return (
    <TableCell className="text-right space-x-2">
      <ShowDialog data={show} />
      <Button variant="ghost" size="icon" className="text-blue-500">
        <Edit className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="text-destructive">
        <Trash className="h-4 w-4" />
      </Button>
    </TableCell>
  );
};

export default Actions;
