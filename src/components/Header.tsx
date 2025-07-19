import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "./Link";
import { ShoppingCart } from "lucide-react";

const Header = () => {
  const links = [
    { name: "Today special offers", href: "/special-offer" },
    { name: "Why FoodHut", href: "/why-us" },
    { name: "Our Menu", href: "/about" },
  ];
  return (
    <header className="absolute top-0 left-0 w-full  z-50 ">
      <div className="container flex items-center justify-between py-4">
        <Link href={"/"}>
          <Image
            src="/assets/icons/Logo.png"
            alt="logo "
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
                  href={link.href}
                  className="hover:text-primary transition-all duration-300 font-semibold"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex justify-center items-center gap-3">
            <Button size="lg">Order Now</Button>
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
