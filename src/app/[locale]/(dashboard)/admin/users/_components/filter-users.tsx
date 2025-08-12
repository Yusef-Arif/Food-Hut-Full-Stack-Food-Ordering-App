"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRoles } from "@prisma/client";
import { Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const FilterUsers = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleFilter = (role: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("role", role);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Filter /> Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>By Roles</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleFilter(UserRoles.ADMIN)}>
          Admins
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleFilter(UserRoles.USER)}>
          Users
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterUsers;
