import { Prisma } from "@/generated/prisma";

export type productWithRelations = Prisma.ProductGetPayload<{
  include: {
    sizes: true;
    extras: true;
    Category: true;
  };
}>;

export type categoryWithProducts = Prisma.CategoryGetPayload<{
  include: {
    product: {
      include: {
        sizes: true;
        extras: true;
        Category: true;
      };
    };
  };
}>;
