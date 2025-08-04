"use client";

import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image, { StaticImageData } from "next/image";
import SwitchLang from "@/app/[locale]/(website)/_components/SwitchLang";
import { useParams } from "next/navigation";

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
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className=" text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
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
          <SwitchLang locale={locale} />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
