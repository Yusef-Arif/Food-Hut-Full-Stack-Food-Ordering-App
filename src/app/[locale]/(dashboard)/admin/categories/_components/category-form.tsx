"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Loader, Plus } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { EditCategory, AddCategory } from "@/server/_actions/category";
import { toast } from "sonner";
import { categoryWithProducts } from "@/lib/types";
import { Translations } from "@/interfaces/translations";

export function CategoryForm({
  category,
  translations,
}: {
  category: categoryWithProducts | undefined;
  translations: Translations;
}) {
  const isEditMode = category !== undefined;
  const [open, setOpen] = useState(false);
  const initialState = {
    status: 0,
    error: "",
    message: "",
    formData: new FormData(),
  };
  const [state, action, pending] = useActionState(
    isEditMode ? EditCategory.bind(null, category.id) : AddCategory,
    initialState
  );

  useEffect(() => {
    if (state.status && state.status === 200 && isEditMode) {
      toast.success(translations.messages.updateSuccess);
      setOpen(false);
    }

    if (state.status && state.status === 200 && !isEditMode) {
      toast.success(translations.messages.categoryCreated);
      setOpen(false);
    }

    if (state.status && state.status !== 200) {
      toast.error(state.message);
    }
  }, [state]);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditMode ? (
          <Button variant={"ghost"} className="text-blue-500">
            <Edit />
          </Button>
        ) : (
          <Button variant="outline">
            <Plus /> {translations.dashboard.nav.createCategory}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form action={action}>
          <DialogHeader>
            <DialogTitle className="heading">
              <Plus />{" "}
              {isEditMode
                ? translations.labels.editCategory
                : translations.dashboard.nav.createCategory}
            </DialogTitle>
          </DialogHeader>
          <div className=" my-4">
            <Label htmlFor="name-1" className="mb-2">
              {translations.labels.category}
            </Label>
            <Input
              id="name-1"
              name="name"
              placeholder={translations.placeholders.category}
              defaultValue={category && category.name}
            />

            {state.status === 400 && (
              <p className="text-sm font-semibold text-red-600">
                {state.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{translations.labels.cancel}</Button>
            </DialogClose>
            <Button type="submit">
              {pending && <Loader className="animate-spin" />}{" "}
              {translations.labels.ok}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
