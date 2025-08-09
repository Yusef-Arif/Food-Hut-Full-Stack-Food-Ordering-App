import { getUsers } from "@/server/db/users";
import React from "react";
import UsersTable from "./_components/users-table";
import { Users } from "lucide-react";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";

const page = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params;
  const translation = await getTrans(locale);
  const users = await getUsers();
  return (
    <div>
      <h1 className="text-4xl font-bold mb-3 text-primary flex justify-start items-center gap-1.5">
        <Users />
        {translation.dashboard.nav.allUsers}
      </h1>
      <UsersTable users={users} locale={locale} />
    </div>
  );
};

export default page;
