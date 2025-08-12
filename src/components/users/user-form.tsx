"use client";
import Image from "next/image";
import React, { useEffect, useState, useTransition } from "react";
import useFormFields from "@/hooks/useFormFields";
import { Translations } from "@/interfaces/translations";
import FormFiald from "../FormFiald";
import { Button } from "../ui/button";
import { CameraIcon, Loader } from "lucide-react";
import { toast } from "sonner";
import { Session } from "next-auth";
import { UserRoles } from "@prisma/client";
import { CheckBox } from "../CheckBox";
import { useSession } from "next-auth/react";
import {
  InitialState,
  createUser,
  editCurrentUser,
} from "@/server/_actions/users";
import { useParams, useRouter } from "next/navigation";

const UserForm = ({
  translations,
  user,
  slug,
}: {
  translations: Translations;
  user: Session["user"] | undefined;
  slug: string;
}) => {
  const formData = new FormData();
  const session = useSession();
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const { locale } = useParams();

  if (user) {
    Object.entries(user).forEach(([key, value]) => {
      if (value !== null && value !== undefined && key !== "image") {
        formData.append(key, value.toString());
      }
    });
  }

  const [isAdmin, setIsAdmin] = useState(user?.role === UserRoles.ADMIN);
  const [selectedImage, setSelectedImage] = useState(user?.image ?? "");

  const fieldsSlug: string = slug === "create" ? "addUser" : "editUser";
  const { getFields } = useFormFields({ slug: fieldsSlug, translations });

  const [state, setState] = useState<InitialState>({ status: 0 });
  const [pending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result =
        slug === "create"
          ? await createUser(null, formData)
          : await editCurrentUser(isAdmin, null, formData);
      setState(result);
    });
  };

  useEffect(() => {
    if (state.status === 400 && state?.error) {
      const formattedErrors: Record<string, string> = {};
      if (Array.isArray(state.error)) {
        state.error.forEach((err: { path: string[]; message: string }) => {
          const field = err.path.length === 0 ? "password" : err.path[0];
          formattedErrors[field] = err.message;
        });
      } else {
        // Handle string error
        formattedErrors.general = state.error;
      }
      setErrors(formattedErrors);
      return;
    }
    if (
      state?.status === 200 &&
      state.message &&
      !pending &&
      slug === "create"
    ) {
      router.push(`/${locale}/admin/users`);
      toast.success(translations.messages.createSuccess);
      setErrors({});
    }

    if (state?.status === 200 && state.message && !pending && slug === "edit") {
      router.push(`/${locale}/admin/users`);
      toast.success(translations.messages.updateSuccess);
      setErrors({});
    }

    if (state?.status !== 200 && state.message && !pending) {
      toast.error(translations.messages.updateSuccess);
    }
  }, [state, translations, pending]);

  useEffect(() => {
    setSelectedImage(user?.image as string);
  }, [user?.image]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleSubmit(formData);
      }}
      className={`flex gap-15 ${
        slug !== "profile" ? "flex-col mb-7" : ""
      } w-full`}
    >
      <div className="group relative w-[200px] h-[200px] overflow-hidden rounded-full mx-auto ">
        {selectedImage && (
          <Image
            src={selectedImage}
            alt={user?.name ?? "name"}
            width={200}
            height={200}
            className="rounded-full object-cover"
          />
        )}

        <div
          className={`${
            selectedImage
              ? "group-hover:opacity-[1] opacity-0  transition-opacity duration-200"
              : ""
          } absolute top-0 left-0 w-full h-full bg-gray-50/40`}
        >
          <UploadImage setSelectedImage={setSelectedImage} />
        </div>
      </div>
      <div className="w-full">
        {getFields().map((field) => {
          const fieldValue =
            state?.formData?.get(field.name) ?? formData.get(field.name);
          return (
            <div key={field.id} className="mb-5">
              <FormFiald
                {...field}
                defaultValue={slug === "create" ? "" : (fieldValue as string)}
                error={errors}
                readOnly={
                  (slug === "profile" || slug === "edit") &&
                  field.type === "email"
                }
              />
            </div>
          );
        })}

        {session.data?.user.role === UserRoles.ADMIN && (
          <CheckBox
            title="Admin"
            checked={isAdmin}
            onClick={() => setIsAdmin(!isAdmin)}
            name="admin"
          />
        )}

        <Button
          type="submit"
          className={`${
            slug === "edit" ? "fixed bottom-5 left-9 w-[80%]" : "w-full mt-4"
          } `}
        >
          {pending && <Loader className="animate-spin" />}
          {slug === "edit" || slug === "profile"
            ? translations.labels.editUser
            : translations.authPrompt.goToLogin}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;

const UploadImage = ({
  setSelectedImage,
}: {
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };
  return (
    <>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="image-upload"
        onChange={handleImageChange}
        name="image"
      />
      <label
        htmlFor="image-upload"
        className="border border-primary rounded-full w-[200px] h-[200px] flex justify-center items-center cursor-pointer"
      >
        <CameraIcon className="!w-8 !h-8 text-primary" />
      </label>
    </>
  );
};
