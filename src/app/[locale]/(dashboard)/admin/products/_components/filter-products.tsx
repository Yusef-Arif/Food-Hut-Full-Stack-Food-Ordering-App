import CategoryFilter from "@/app/[locale]/(website)/menu/_components/category-filter";
import PriceFilter from "@/app/[locale]/(website)/menu/_components/price-filter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Category } from "@prisma/client";
import { Filter } from "lucide-react";

export function FilterProducts({ categories }: { categories: Category[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Filter /> Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="heading mb-4">
            <Filter /> Filter
          </DialogTitle>
        </DialogHeader>
        <div>
          <CategoryFilter categories={categories} />
          <PriceFilter />

          <DialogClose asChild className="w-full">
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
