"use client";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import Links from "./links";
import { Translations } from "@/interfaces/translations";
import { Session } from "next-auth";
import useGetSession from "@/hooks/useGetSession";
import { ProfileMenu } from "./ProfileMenu";
import { useParams } from "next/navigation";
import Link from "../Link";
import { Button } from "../ui/button";

const MobileMenu = ({
  translation,
  initialSession,
}: {
  translation: Translations;
  initialSession: Session | null;
}) => {
  const [open, setOpen] = useState(false);
  const session = useGetSession(initialSession);
  const { locale } = useParams() as { locale: string };
  return (
    <div className="relative z-50">
      <button onClick={() => setOpen(!open)}>
        <div className="relative w-12 h-12 flex items-center justify-center">
          <Menu
            size={30}
            className={`absolute transform transition-all duration-300 ease-in-out ${
              open
                ? "opacity-0 rotate-90 scale-0"
                : "opacity-100 rotate-0 scale-100"
            }`}
          />
          <X
            size={30}
            className={`absolute transform transition-all duration-300 ease-in-out ${
              open
                ? "opacity-100 rotate-180 scale-100"
                : "opacity-0 -rotate-90 scale-0"
            }`}
          />
        </div>
      </button>
      <div
        className={`w-[350px] p-4 rounded-2xl shadow-md absolute top-16 left-0  bg-white dark:bg-gray-800 transition-transform duration-300 ease-in-out ${
          open ? "-translate-x-[85%]" : "translate-x-[150%]"
        }`}
      >
        <Links translation={translation} />

        <div className="w-full">
          {session.data?.user ? (
            <div className="flex justify-center items-center">
              <ProfileMenu translation={translation} session={session.data} />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link href={`/${locale}/auth/signUp`}>
                <Button size="lg" variant="link" className="w-full">
                  {translation.authPrompt.register}
                </Button>
              </Link>
              <Link href={`/${locale}/auth/login`}>
                <Button size="lg" className="w-full">
                  {translation.authPrompt.login}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
