"use client";

import { Button } from "@/components/ui/button";
import { ParamValue } from "next/dist/server/request/params";
import { usePathname, useRouter } from "next/navigation";

function SwitchLang({ locale }: { locale: string | ParamValue }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = (newLocale: string) => {
    const path =
      pathname?.replace(`/${locale}`, `/${newLocale}`) ?? `/${newLocale}`;
    router.push(path);
  };

  return (
    <Button
      size="md"
      variant="outline"
      onClick={() => handleSwitch(locale === "ar" ? "en" : "ar")}
    >
      {locale === "ar" ? "ENG" : "العربيه"}
    </Button>
  );
}

export default SwitchLang;
