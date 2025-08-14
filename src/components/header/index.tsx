import React from "react";
import { ShoppingCart } from "lucide-react";
import { getCurrentLocale } from "@/lib/getCurrentLocale ";
import getTrans from "@/lib/translation";
import SwitchLang from "@/app/[locale]/(website)/_components/SwitchLang";
import Link from "../Link";
import AuthButtons from "./AuthButtons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/authOptions";
import { ThemeToggle } from "./ThemeToggle";
import Logo from "./logo";
import MobileMenu from "./mobile-menu";
import Links from "./links";

const Header = async () => {
  const locale = await getCurrentLocale();
  const translation = await getTrans(locale);
  const initialSession = await getServerSession(authOptions);

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 sm:h-20 md:h-24">
          {/* Left Section - Logo and Navigation Links */}
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <Logo locale={locale} />
            <div className="hidden md:flex">
              <Links translation={translation} />
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3 lg:gap-4">
            <div className="flex items-center gap-2">
              <SwitchLang locale={locale} />
              <ThemeToggle />
            </div>

            <Link
              href={`/${locale}/cart`}
              className="relative flex items-center justify-center"
            >
              <ShoppingCart
                className="text-primary hover:bg-primary/5 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl transition-all duration-300"
                size={42}
              />
            </Link>

            <div className="flex items-center">
              <AuthButtons
                translation={translation}
                locale={locale}
                initialSession={initialSession}
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <Link
              href={`${locale}/cart`}
              className="relative flex items-center justify-center"
            >
              <ShoppingCart
                className="text-primary hover:bg-primary/5 rounded-xl transition-all duration-300"
                size={32}
              />
            </Link>
            <MobileMenu
              translation={translation}
              initialSession={initialSession}
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
