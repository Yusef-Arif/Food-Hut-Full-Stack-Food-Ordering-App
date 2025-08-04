"use client";
import Image from "next/image";
import React, { useActionState, useEffect, useState } from "react";
import useFormFields from "@/hooks/useFormFields";
import { Translations } from "@/interfaces/translations";
import FormFiald from "../FormFiald";
import { Button } from "../ui/button";
import { CameraIcon, Loader } from "lucide-react";
import editUser, { InitialState } from "./_action/editUser";
import { toast } from "sonner";
import { Session } from "next-auth";
import { UserRoles } from "@prisma/client";
import { CheckBox } from "../CheckBox";
import { useSession } from "next-auth/react";

const EditUser = ({
  translations,
  user,
}: {
  translations: Translations;
  user: Session["user"];
}) => {
  const formData = new FormData();
  const session = useSession();
  const [errors,setErrors] = useState({});

  Object.entries(user).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== "image") {
      formData.append(key, value.toString());
    }
  });
  const [isAdmin, setIsAdmin] = useState(user.role === UserRoles.ADMIN);
  const [selectedImage, setSelectedImage] = useState(user.image ?? "");
  const initialState: InitialState = {
    message: "",
    error: {},
    status: null,
    formData,
  };

  const { getFields } = useFormFields({ slug: "editUser", translations });
  const [state, action, pending] = useActionState(
    editUser.bind(null, isAdmin),
    initialState
  );

  useEffect(() => {
    if (state.status === 400 && state?.error) {
      const formattedErrors: Record<string, string> = {};
      state?.error.forEach((err: { path: string[]; message: string }) => {
        const field = err.path.length === 0 ? "password" : err.path[0];
        formattedErrors[field] = err.message;
      });
      setErrors(formattedErrors);
      return;
    }
    if (state?.status === 200 && state.message && !pending) {
      toast.success(translations.messages.updateSuccess);
    }

    if (state?.status !== 200 && state.message && !pending) {
      toast.error(translations.messages.updateSuccess);
    }
  }, [state, translations, pending]);

  useEffect(() => {
    setSelectedImage(user.image as string);
  }, [user.image]);

  console.log(state?.error);

  return (
    <form action={action} className="flex gap-15">
      <div className="group relative w-[200px] h-[200px] overflow-hidden rounded-full mx-auto ">
        {selectedImage && (
          <Image
            src={selectedImage}
            alt={user.name}
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
      <div className="w-[80%]">
        {getFields().map((field) => {
          const fieldValue =
            state?.formData?.get(field.name) ?? formData.get(field.name);
          console.log(
            state?.formData?.get(field.name),
            formData.get(field.name)
          );
          return (
            <div key={field.id} className="mb-5">
              <FormFiald
                {...field}
                defaultValue={fieldValue as string}
                error={errors}
                readOnly={field.type === "email"}
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

        <Button type="submit" className="w-full mt-4">
          {pending && <Loader className="animate-spin" />}
          {translations.authPrompt.login}
        </Button>
      </div>
    </form>
  );
};

export default EditUser;

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
        className="border rounded-full w-[200px] h-[200px] flex justify-center items-center cursor-pointer"
      >
        <CameraIcon className="!w-8 !h-8 text-accent" />
      </label>
    </>
  );
};
