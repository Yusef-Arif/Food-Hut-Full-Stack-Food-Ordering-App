import { getUsers } from "@/server/db/users";
import React from "react";
import UsersTable from "./_components/users-table";
import { Users } from "lucide-react";
// import { EditUserDialog } from "./_components/edit-user";

const page = async () => {
  const users = await getUsers();
  return (
    <div>
      <div>
      <h1 className="text-4xl font-bold mb-3 text-primary flex justify-start items-center gap-1.5">
        <Users />
        Users
      </h1>
      {/* <EditUserDialog /> */}
      </div>
      <UsersTable users={users} />
    </div>
  );
};

export default page;
