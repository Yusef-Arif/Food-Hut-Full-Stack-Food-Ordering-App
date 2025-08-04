import React from "react";

import { getCurrentLocale } from "@/lib/getCurrentLocale ";
import getTrans from "@/lib/translation";
import Form from "./_components/Form";

async function page() {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  return (
    <main className="flex justify-center items-center min-h-[100vh] bg-primary/3">
      <div className="p-6 shadow-lg rounded-xl bg-white">
        <h1 className="text-4xl text-primary font-bold text-center mb-7">
          {translations.authPrompt.register}
        </h1>
        <Form translations={translations} locale={locale} />
      </div>
    </main>
  );
}

export default page;
