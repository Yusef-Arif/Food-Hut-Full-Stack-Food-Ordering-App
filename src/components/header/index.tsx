import Image from "next/image";
import React from "react";
import { ShoppingCart } from "lucide-react";
import { getCurrentLocale } from "@/lib/getCurrentLocale ";
import getTrans from "@/lib/translation";
import SwitchLang from "@/app/[locale]/(website)/_components/SwitchLang";
import logoImage from "@/../public/assets/icons/Logo.png";
import Link from "../Link";
import AuthButtons from "./AuthButtons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/authOptions";

const Header = async () => {
  const locale = await getCurrentLocale();
  const translation = await getTrans(locale);
  const initialSession = await getServerSession(authOptions);

  const links = [
    { name: translation.navbar.specialOffers, href: "/special-offer" },
    { name: translation.navbar.whyUs, href: "/why-us" },
    { name: translation.navbar.menu, href: "/about" },
  ];

  return (
    <header className="absolute top-0 left-0 w-full  z-50 ">
      <div className="container flex items-center justify-between py-4">
        <Link href={`/${locale}`}>
          <Image
            src={logoImage}
            alt="logo"
            width={96}
            height={96}
            priority
            loading="eager"
          />
        </Link>
        <nav className="flex items-center justify-between space-x-8">
          <ul className="flex space-x-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={`/${locale}${link.href}`}
                  className="hover:text-primary transition-all duration-300 font-semibold"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex justify-center items-center gap-3">
            <AuthButtons translation={translation} locale={locale} initialSession={initialSession}/>

            <SwitchLang locale={locale} />
            <Link href={"/cart"}>
              <ShoppingCart
                className="text-primary hover:text-secondary hover:bg-primary p-2 rounded-2xl transition-all duration-300"
                size={50}
              />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
