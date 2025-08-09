import { cache } from "@/lib/caching";
import { db } from "@/lib/prisma";

export const getCategorys = cache(
  () => {
    const categorys = db.category.findMany();

    return categorys;
  },
  ["get-all-Categorys"],
  { revalidate: 3600 }
);

export const getCategorysProducts = cache(
  () => {
    const categorys = db.category.findMany({
      include: {
        product: { include: { sizes: true, extras: true, Category: true } },
      },
    });

    return categorys;
  },
  ["get-all-Categorys-products"],
  { revalidate: 3600 }
);
