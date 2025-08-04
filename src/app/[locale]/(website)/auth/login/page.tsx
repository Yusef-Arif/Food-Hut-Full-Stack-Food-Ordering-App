import React from "react";
import Form from "./_components/Form";
import { getCurrentLocale } from "@/lib/getCurrentLocale ";
import getTrans from "@/lib/translation";

async function page() {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  return (
    <main className="flex justify-center items-center min-h-[100vh] bg-primary/3">
      <div className="p-6 shadow-lg rounded-xl bg-white">
        <h1 className="text-4xl text-primary font-bold text-center mb-7">
          {translations.authPrompt.login}
        </h1>
        <Form translations={translations} locale={locale} />
      </div>
    </main>
  );
}

export default page;
