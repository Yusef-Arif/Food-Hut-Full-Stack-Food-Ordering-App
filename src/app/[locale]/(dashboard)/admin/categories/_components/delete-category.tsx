"use client";
import { Button } from "@/components/ui/button";
import { Loader, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteCategory } from "@/server/_actions/category";
import { Translations } from "@/interfaces/translations";
import { useParams } from "next/navigation";

export function DeleteCategory({
  categoryId,
  translations,
}: {
  categoryId: string;
  translations: Translations;
}) {
  const [isPending, startTransition] = useTransition();
  const { locale } = useParams();
  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteCategory(categoryId);

      if (res.status === 200 && res.status) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} className="text-red-500">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className={`${locale === "ar" ? "rtl" : ""}`}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {translations.alerts.deleteCategory.title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {translations.alerts.deleteCategory.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{translations.labels.cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            {isPending && <Loader className="animate-spin" />}{" "}
            {translations.labels.ok}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
