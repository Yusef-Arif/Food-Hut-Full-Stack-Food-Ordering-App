import { cache } from "@/lib/caching";
import { db } from "@/lib/prisma";

export const getUsers = cache(
  () => {
    const users = db.user.findMany();

    return users;
  },
  ["get-all-users"],
  { revalidate: 3600 }
);
