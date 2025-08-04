"use client";
import FormFiald from "@/components/FormFiald";
import Link from "@/components/Link";
import { Button } from "@/components/ui/button";
import useFormFields from "@/hooks/useFormFields";
import { Locale } from "@/i18n.config";
import { IFormField } from "@/interfaces/fields";
import { Translations } from "@/interfaces/translations";
import { SignUp, State } from "@/server/_actions/auth";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const initialState: State = {
  message: "",
  error: undefined,
  status: 0,
  user: { id: "", email: "", name: "" },
};

function Form({
  translations,
  locale,
}: {
  translations: Translations;
  locale: Locale;
}) {
  const { getFields } = useFormFields({ slug: "signUp", translations });
  const [state, action, pending] = useActionState(SignUp, initialState);
  const router = useRouter();
  const [error, setError] = useState({});

  useEffect(() => {
    if (state.status === 400 && state.error) {
      const formattedErrors: Record<string, string> = {};
      state.error.forEach((err: { path: string[]; message: string }) => {
        const field = err.path.length === 0 ? "password" : err.path[0];
        formattedErrors[field] = err.message;
      });
      setError(formattedErrors);
      return;
    }

    if (state.status === 401 || state.status === 500) {
      toast.error(state.message);
      return;
    }

    if (state.status === 201) {
      toast.success(state.message);
      router.replace(`/${locale}`);
    }
  }, [state, locale, router]);

  return (
    <>
      <form action={action}>
        {getFields().map((field: IFormField) => (
          <div key={field.id} className="mb-4 w-[350px]">
            <FormFiald {...field} error={error} />
          </div>
        ))}

        <Button type="submit" className="w-full mt-4" disabled={pending}>
          {pending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          {translations.authPrompt.register}
        </Button>

        <p className="text-center mt-4 text-muted">
          {translations.authPrompt.noAccount}{" "}
          <Link href={`/${locale}/auth/login`} className="text-primary">
            {translations.authPrompt.goToLogin}
          </Link>
        </p>
      </form>
    </>
  );
}

export default Form;
