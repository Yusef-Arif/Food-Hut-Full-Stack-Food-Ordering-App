"use client";
import { useParams, usePathname } from "next/navigation";
import Link from "../Link";
import { Translations } from "@/interfaces/translations";
import { useEffect, useState } from "react";

const Links = ({ translation }: { translation: Translations }) => {
  const { locale } = useParams() as { locale: string };
  const pathName = usePathname();
  const [active, setActive] = useState<string>("");

  const links = [
    { name: translation?.navbar.specialOffers, href: "/special-offer" },
    { name: translation?.navbar.whyUs, href: "/why-us" },
    { name: translation?.navbar.menu, href: "/menu" },
  ];

  useEffect(() => {
    setActive(pathName.split("/")[2]);
  }, [pathName]);

  return (
    <ul className="flex space-x-4 max-md:flex-col max-md:space-x-0 max-md:space-y-2">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={`/${locale}${link.href}`}
            className={`hover:text-primary transition-all duration-300 font-semibold ${
              active === link.href.slice(1) ? "text-primary" : ""
            }`}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Links;
