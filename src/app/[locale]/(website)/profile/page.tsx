
import UserForm from "@/components/users/user-form";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import { authOptions } from "@/server/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

const page = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params;
  const translations = await getTrans(locale);
  const session = await getServerSession(authOptions);
  return (
    <div className="py-23">
      <div className="container">
        <h1 className="text-5xl font-bold text-primary mb-7">Profile</h1>
        <div>
          <UserForm translations={translations} user={session?.user} slug='profile' />
        </div>
      </div>
    </div>
  );
};

export default page;
