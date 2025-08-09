import UserForm from "@/components/users/user-form";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import { Plus } from "lucide-react";
import React from "react";

const page = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params;
  const translation = await getTrans(locale);
  return (
    <section>
      <h1 className="heading">
        <Plus /> {translation.dashboard.nav.createUser}
      </h1>

      <UserForm translations={translation} slug="create" user={undefined}/>
    </section>
  );
};

export default page;
