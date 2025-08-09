"use client";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { Loader, Trash } from "lucide-react";
import { deleteProduct } from "@/server/_actions/products";
import { toast } from "sonner";
import { Translations } from "@/interfaces/translations";
import { deleteUser } from "@/server/_actions/users";

const DeleteAction = ({
  id,
  translations,
  slug,
}: {
  id: string;
  translations: Translations;
  slug: string | undefined;
}) => {
  const [isPending, startTransition] = useTransition();
  const handleDelete = () => {
    startTransition(async () => {
      const res =
        slug === "user" ? await deleteUser(id) : await deleteProduct(id);

      if (res.status === 200 && res.status) {
        toast.success(translations.messages.deleteSuccess);
      } else {
        toast.error(translations.errors.somethingWentWrong);
      }
    });
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-destructive"
      onClick={handleDelete}
    >
      {isPending ? (
        <Loader className="animate-spin h-4 w-4" />
      ) : (
        <Trash className="h-4 w-4" />
      )}
    </Button>
  );
};

export default DeleteAction;
