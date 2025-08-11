"use client";
import FormFiald from "@/components/FormFiald";
import Link from "@/components/Link";
import { Button } from "@/components/ui/button";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/interfaces/fields";
import { Translations } from "@/interfaces/translations";
import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n.config";
import { Loader } from "lucide-react";

function Form({
  translations,
  locale,
}: {
  translations: Translations;
  locale: Locale;
}) {
  const { getFields } = useFormFields({ slug: "login", translations });
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        const validateError = JSON.parse(res?.error).validationError;
        if (validateError !== null) {
          const formattedErrors: Record<string, string> = {};
          validateError.forEach((err: { path: string[]; message: string }) => {
            const field = err.path[0];
            formattedErrors[field] = err.message;
          });
          setError(formattedErrors);
        }else{
          setError({});
        }

        const responseError = JSON.parse(res?.error).responseError;
        if (responseError) {
          toast.error(responseError);
        }
      }

      if (res?.ok) {
        toast.success(translations.messages.loginSuccess);
        router.replace(`/${locale}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} ref={formRef}>
        {getFields().map((field: IFormField) => (
          <div key={field.id} className="mb-4 lg:w-[350px]">
            <FormFiald {...field} error={error} />
          </div>
        ))}

        <Button type="submit" className="w-full mt-4">
          {loading && <Loader className="animate-spin" />}
          {translations.authPrompt.login}
        </Button>

        <p className="text-center mt-4 text-muted dark:text-muted-foreground">
          {translations.authPrompt.noAccount}{" "}
          <Link href={`/${locale}/auth/signUp`} className="text-primary">
            {translations.authPrompt.goToRegister}
          </Link>
        </p>
      </form>
    </>
  );
}

export default Form;
