import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "../Link";
import { Translations } from "@/interfaces/translations";
import { Session } from "next-auth";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { UserRoles } from "@prisma/client";
import { useParams } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import Image from "next/image";
export function ProfileMenu({
  translation,
  session,
}: {
  translation: Translations;
  session: Session | null;
}) {
  const { locale } = useParams();

  const handleLogout = () => {
    signOut();
    toast.success(translation.messages.logoutSuccess);
  };

  console.log(session?.user.image);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {!session?.user.image ? (
          <Button variant="outline">{translation.profileMenu.open}</Button>
        ) : (
          <Image
            src={session?.user.image}
            alt={session?.user.name}
            height={500}
            width={500}
            className="object-contain size-12 rounded-full cursor-pointer"
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`w-56 ${locale === "ar" ? "text-end" : ""}`}
        align="start"
      >
        <DropdownMenuLabel>
          {translation.profileMenu.myAccount}
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={`/${locale}/profile`} className="flex gap-2">
              <User />
              {translation.profileMenu.profile}
            </Link>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          {session?.user.role === UserRoles.ADMIN ? (
            <DropdownMenuItem>
              <Link href={`/${locale}/admin`} className="flex gap-2">
                <LayoutDashboard />
                {translation.profileMenu.dashboard}
              </Link>
            </DropdownMenuItem>
          ) : (
            ""
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="text-destructive" />
          {translation.profileMenu.logout}
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
