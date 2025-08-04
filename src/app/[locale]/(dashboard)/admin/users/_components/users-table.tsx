import MainTable from "@/components/table";
import Actions from "@/components/table/actions";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { User } from "@prisma/client";
import { ShieldCheck, User as UserIcon } from "lucide-react";
import Image from "next/image";

const UsersTable = ({ users }: { users: User[] }) => {
  const cols = [
    "ID",
    "Image",
    "Name",
    "Email",
    "Role",
    "Creadted At",
    "Updated At",
  ];
  let id = 0;
  return (
    <div>
      <MainTable cols={cols}>
        {users.map((user) => {
          id++;
          return (
            <TableRow key={user.id}>
              <TableCell className="text-center">{id}</TableCell>
              <TableCell>
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={50}
                    height={50}
                    className="rounded-md object-contain size-10"
                  />
                ) : (
                  <UserIcon className="rounded-md object-contain size-10 " />
                )}
              </TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                {user.email}
              </TableCell>
              <TableCell>
                {user.role === "ADMIN" ? (
                  <Badge className="bg-green-500 text-white dark:bg-green-600">
                    <ShieldCheck />
                    {user.role}
                  </Badge>
                ) : (
                  <Badge className="bg-blue-500 text-white dark:bg-blue-600">
                    <UserIcon />
                    {user.role}
                  </Badge>
                )}
              </TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(user.updatedAt).toLocaleString()}</TableCell>
              <Actions show={user} />
            </TableRow>
          );
        })}
      </MainTable>
    </div>
  );
};

export default UsersTable;
