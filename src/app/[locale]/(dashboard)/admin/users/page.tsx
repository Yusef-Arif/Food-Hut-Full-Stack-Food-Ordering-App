import React from "react";
import UsersTable from "./_components/users-table";
import { Users } from "lucide-react";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import { getFilteredUsers } from "@/server/_actions/users";
import { User } from "@prisma/client";
import FilterUsers from "./_components/filter-users";
import Search from "@/components/Search";

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ page: string; role: string; search?: string }>;
}) => {
  const { locale } = await params;
  const translation = await getTrans(locale);
  const { users, pagesCount, currentPage } = await getFilteredUsers({
    page: Number((await searchParams).page) || 1,
    limit: 10,
    role: (await searchParams).role,
    search: (await searchParams).search,
  });
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold mb-3 text-primary flex justify-start items-center gap-1.5">
          <Users />
          {translation.dashboard.nav.allUsers}
        </h1>
        <div className="flex gap-3 items-center">
          <Search />
          <FilterUsers />
        </div>
      </div>
      <UsersTable
        page={Number((await searchParams).page) || 1}
        currentPage={currentPage ?? 0}
        pagesCount={pagesCount ?? 0}
        users={users as User[]}
        locale={locale}
      />
    </div>
  );
};

export default page;
