import ProductForm from "@/app/[locale]/(dashboard)/admin/products/_components/product-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Translations } from "@/interfaces/translations";
import { productWithRelations } from "@/lib/types";
import { getCategorys } from "@/server/db/categorys";
import { Category, User } from "@prisma/client";
import { Edit, Pen } from "lucide-react";
import UserForm from "../users/user-form";
import { Button } from "../ui/button";

export async function EditProduct({
  translations,
  product,
}: {
  translations: Translations;
  product: productWithRelations;
}) {
  const categorys: Category[] = await getCategorys();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-blue-500">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-primary font-bold flex gap-2 items-center text-2xl">
            <Pen />
            {translations.labels.editProduct}
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[500px] overflow-y-auto p-5">
          <ProductForm
            translations={translations}
            categorys={categorys}
            product={product}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export async function EditUser({
  translations,
  user,
}: {
  translations: Translations;
  user: User;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-blue-500">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-primary font-bold flex gap-2 items-center text-2xl">
            <Pen />
            {translations.labels.editUser}
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[500px] overflow-y-auto p-5">
          <UserForm translations={translations} user={user} slug="edit" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
