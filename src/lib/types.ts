import { Prisma } from "@prisma/client";


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
