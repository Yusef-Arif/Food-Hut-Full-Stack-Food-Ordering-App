import { cache } from "@/lib/caching";
import { db } from "@/lib/prisma";

export const getProducts = cache(
  () => {
    const products = db.product.findMany({
      include: {
        sizes: true,
        extras: true,
        Category: true,
      },
    });

    return products;
  },
  ["get-all-products"],
  { revalidate: 3600 }
);
