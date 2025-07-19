import { Prisma } from "@/generated/prisma";

export type productWithRelations = Prisma.ProductGetPayload<{
  include: {
    sizes: true;
    extras: true;
  };
}>;
