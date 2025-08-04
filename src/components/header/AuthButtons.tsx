"use client";
import useGetSession from "@/hooks/useGetSession";
import { Locale } from "@/i18n.config";
import { Translations } from "@/interfaces/translations";
import { Session } from "next-auth";
import React from "react";
import Link from "../Link";
import { Button } from "../ui/button";
import { ProfileMenu } from "./ProfileMenu";

const AuthButtons = ({
  translation,
  locale,
  initialSession,
}: {
  locale: Locale;
  translation: Translations;
  initialSession: Session | null;
}) => {
  const session = useGetSession(initialSession);
  return (
    <div>
      {session.data?.user ? (
        <ProfileMenu translation={translation} session={session.data} />
      ) : (
        <>
          <Link href={`/${locale}/auth/signUp`}>
            <Button size="lg" variant="link">
              {translation.authPrompt.register}
            </Button>
          </Link>
          <Link href={`/${locale}/auth/login`}>
            <Button size="lg">{translation.authPrompt.login}</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
