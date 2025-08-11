"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logoImage1 from "@/../public/assets/icons/Logo.png";
import logoImage2 from "@/../public/assets/icons/Logo2.png";
import { Locale } from "@/i18n.config";
import Link from "../Link";

const Logo = ({ locale }: { locale: Locale }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and before mounting, render a placeholder or default logo
  if (!mounted) {
    return (
      <Link href={`/${locale}`}>
        <Image
          src={logoImage1}
          alt="logo"
          width={96}
          height={96}
          priority
          loading="eager"
        />
      </Link>
    );
  }

  return (
    <Link href={`/${locale}`}>
      <Image
        src={resolvedTheme === "dark" ? logoImage2 : logoImage1}
        alt="logo"
        width={96}
        height={96}
        priority
        loading="eager"
      />
    </Link>
  );
};

export default Logo;
