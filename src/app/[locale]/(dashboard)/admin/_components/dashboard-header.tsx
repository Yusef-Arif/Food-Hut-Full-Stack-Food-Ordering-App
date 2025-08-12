"use client";
import Link from "@/components/Link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const DashboardHeader = () => {
  const path = usePathname();
  const { locale } = useParams();
  const prevLinks = path.split("/").slice(2, -1);
  const current = path.split("/").slice(-1);
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {prevLinks.map((segment, index) => {
              const href = `/${locale}/${prevLinks
                .slice(0, index + 1)
                .join("/")}`;
              return (
                <React.Fragment key={href}>
                  <BreadcrumbItem className="hidden md:block">
                    <Link
                      className="hover:text-foreground transition-colors"
                      href={href}
                    >
                      {segment}
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                </React.Fragment>
              );
            })}
            <BreadcrumbItem>
              <BreadcrumbPage>
                {Array.isArray(current) ? current[0] : current}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default DashboardHeader;
