"use client";

import * as React from "react";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import Image, { StaticImageData } from "next/image";
import SwitchLang from "@/app/[locale]/(website)/_components/SwitchLang";
import { useParams } from "next/navigation";
import { ThemeToggle } from "./header/ThemeToggle";
import Link from "./Link";

export function TeamSwitcher({
  team,
}: {
  team: {
    name: string;
    logo: StaticImageData;
    plan: string;
  };
}) {
  const { locale } = useParams();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="group/menu-item relative flex">
          <Link
            href={`/${locale}/admin`}
            className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md px-2 py-1.5 text-sm outline-hidden transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:bg-sidebar-accent focus-visible:text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <Image
                src={team.logo}
                alt="logo"
                width={96}
                height={96}
                priority
                className="object-contain size-16"
                loading="eager"
              />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{team.name}</span>
              <span className="truncate text-xs">{team.plan}</span>
            </div>
          </Link>
          <div className="flex items-center gap-2 mt-2">
            <ThemeToggle />
            <SwitchLang locale={locale} />
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
