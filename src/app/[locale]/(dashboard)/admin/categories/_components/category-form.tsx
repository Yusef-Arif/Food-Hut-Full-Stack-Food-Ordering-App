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
import { useActionState, useEffect } from "react";

import { EditCategory, AddCategory } from "@/server/_actions/category";
import { toast } from "sonner";
import { categoryWithProducts } from "@/lib/types";

export function CategoryForm({
  category,
}: {
  category: categoryWithProducts | undefined;
}) {
  const isEditMode = category !== undefined;
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
    if (state.status && state.status === 200) {
      toast.success("created");
    }

    if (state.status && state.status !== 200) {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        {isEditMode ? (
          <Button variant={"ghost"} className="text-blue-500">
            <Edit />
          </Button>
        ) : (
          <Button variant="outline">
            <Plus /> Add Category
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form action={action}>
          <DialogHeader>
            <DialogTitle className="heading">
              <Plus /> New Category
            </DialogTitle>
          </DialogHeader>
          <div className=" my-4">
            <Label htmlFor="name-1" className="mb-2">
              Category Name
            </Label>
            <Input
              id="name-1"
              name="name"
              placeholder="add category name..."
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
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {pending && <Loader className="animate-spin" />} Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
