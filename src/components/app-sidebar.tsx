"use client";

import * as React from "react";
import { Blocks, ShoppingBasket, Users } from "lucide-react";
import logoImage from "@/../public/assets/icons/Logo.png";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Session } from "next-auth";
import { useParams } from "next/navigation";
import { Translations } from "@/interfaces/translations";

export function AppSidebar({
  session,
  translations,
  ...props
}: {
  props: React.ComponentProps<typeof Sidebar>;
  session: Session;
  translations: Translations;
}) {
  const CurrentUser = session.user;
  const { locale } = useParams();
  console.log(locale);

  // This is sample data.
  const data = {
    user: {
      name: CurrentUser.name,
      email: CurrentUser.email,
      avatar: CurrentUser.image ?? "/avatars/shadcn.jpg",
    },
    teams: {
      name: "FoodHut",
      logo: logoImage,
      plan: "Dashboard",
    },
    navMain: [
      {
        title: translations.dashboard.nav.users,
        url: `/${locale}/admin/users`,
        icon: Users,
        isActive: true,
        items: [
          {
            title: translations.dashboard.nav.allUsers,
            url: `/${locale}/admin/users`,
          },
          {
            title: translations.dashboard.nav.createUser,
            url: `/${locale}/admin/users/add-user`,
          },
        ],
      },
      {
        title: translations.dashboard.nav.items,
        url: `/${locale}`,
        icon: ShoppingBasket,
        items: [
          {
            title: translations.dashboard.nav.products,
            url: `/${locale}/admin/products`,
          },
          {
            title: translations.dashboard.nav.createProduct,
            url: `/${locale}/admin/products/add-product`,
          },
        ],
      },
      {
        title: translations.dashboard.nav.categories,
        url: `/${locale}`,
        icon: Blocks,
        items: [
          {
            title: translations.dashboard.nav.allCategories,
            url: `/${locale}/admin/categories`,
          },
          {
            title: translations.dashboard.nav.createCategory,
            url: `/${locale}`,
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher team={data.teams} />
      </SidebarHeader>
      <SidebarContent className={`${locale === "ar" ? "ltr" : " "}`}>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
