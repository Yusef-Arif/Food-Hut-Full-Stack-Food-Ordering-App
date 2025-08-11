"use client";

import FormFiald from "@/components/FormFiald";
import { Button } from "@/components/ui/button";
import useFormFields from "@/hooks/useFormFields";
import { Translations } from "@/interfaces/translations";
import { addProduct, editProduct } from "@/server/_actions/products";
import { Camera, Loader } from "lucide-react";
import { ChangeEvent, useActionState, useEffect } from "react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, Extra, Size } from "@prisma/client";
import { ValidationError } from "next/dist/compiled/amphtml-validator";
import { toast } from "sonner";
import { MoreDetails } from "./options-Field";
import Image from "next/image";
import { productWithRelations } from "@/lib/types";
import { useParams, useRouter } from "next/navigation";
export type InitialState = {
  status?: number | null;
  error?: ValidationError;
  message?: string;
  formData?: FormData | null;
};

const ProductForm = ({
  translations,
  categorys,
  product,
}: {
  translations: Translations;
  categorys: Category[];
  product: productWithRelations | undefined;
}) => {
  const isEditMode = Boolean(product);
  const { locale } = useParams();
  const router = useRouter();
  const { getFields } = useFormFields({ slug: "addProduct", translations });
  const [categoryId, setCategoryId] = useState<string>(
    isEditMode && product?.categoryId ? product.categoryId : ""
  );
  const [sizes, setSizes] = useState<Partial<Size>[]>(
    isEditMode && product?.sizes
      ? product.sizes.map((size) => ({
          name: size.name,
          price: size.price,
        }))
      : []
  );
  const [extras, setExtras] = useState<Partial<Extra>[]>(
    isEditMode && product?.extras
      ? product.extras.map((extra) => ({
          name: extra.name,
          price: extra.price,
        }))
      : []
  );
  const [selectedImage, setSelectedImage] = useState(
    isEditMode && product?.image ? product.image : ""
  );
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const initialState: InitialState = {
    status: null,
    error: {},
    message: "",
    formData: null,
  };
  const [state, action, pending] = useActionState(
    isEditMode && product
      ? editProduct.bind(null, {
          productId: product.id,
          options: {
            sizes,
            extras,
          },
        })
      : addProduct.bind(null, {
          options: {
            sizes,
            extras,
          },
        }),
    initialState
  );

  useEffect(() => {
    if (state.message && state.status && !pending) {
      if (state.status === 400 && state?.error) {
        toast.error(translations.errors.somethingWentWrong);

        const formattedErrors: Record<string, string[]> = {};
        JSON.parse(state?.error).forEach(
          (err: { path: string[]; message: string }) => {
            const field = err.path.length === 0 ? "password" : err.path[0];
            if (!formattedErrors[field]) {
              formattedErrors[field] = [];
            }
            formattedErrors[field].push(err.message);
          }
        );

        setErrors(formattedErrors);
        return;
      }
      if (state.status && state.status === 200) {
        router.push(`/${locale}/admin/products`);
        setSelectedImage("");
        setCategoryId("");
        toast.success(translations.messages.productCreated);
      }
    }
  }, [state, categoryId, pending, isEditMode, product]);

  return (
    <form action={action} className=" flex flex-col gap-4 my-4">
      {/* form Fields */}
      {getFields().map((field, index) => {
        const fieldValue =
          state?.formData?.get(field.name) ??
          (product && product[field.name as keyof typeof product]);
        return (
          <FormFiald
            {...field}
            key={index}
            error={errors}
            defaultValue={fieldValue as string}
          />
        );
      })}

      {/* category Field */}
      <CategoryField
        categorys={categorys}
        setCategoryId={setCategoryId}
        categoryId={categoryId}
        translations={translations}
      />
      <input type="hidden" name="categoryId" value={categoryId} />
      <p className="text-sm font-semibold text-red-600">{errors?.categoryId}</p>

      {/* Image Field */}
      <UploadImage
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        translations={translations}
      />
      <p className="text-sm font-semibold text-red-600">{errors?.image}</p>

      {/* Options Field */}
      <MoreDetails
        slug="sizes"
        options={sizes}
        setOptions={setSizes}
        isEditMode={isEditMode}
        translations={translations}
      />
      <MoreDetails
        slug="extras"
        options={extras}
        setOptions={setExtras}
        isEditMode={isEditMode}
        translations={translations}
      />

      <Button
        type="submit"
        className={`${
          isEditMode ? "fixed bottom-5 left-9 w-[80%]" : " w-full"
        } `}
      >
        <span>{pending && <Loader className="animate-spin" />}</span>{" "}
        {translations.dashboard.nav.createProduct}
      </Button>
    </form>
  );
};

export default ProductForm;

const CategoryField = ({
  categorys,
  setCategoryId,
  translations,
  categoryId,
}: {
  categorys: Category[];
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
  translations: Translations;
  categoryId: string;
}) => {
  return (
    <>
      <h1>{translations.labels.category}</h1>
      <Select value={categoryId} onValueChange={(e) => setCategoryId(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categorys.map((category) => (
            <SelectItem value={category.id} key={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

const UploadImage = ({
  selectedImage,
  setSelectedImage,
  translations,
}: {
  selectedImage: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
  translations: Translations;
}) => {
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };
  return (
    <>
      <h3 className="mb-2">{translations.labels.image}</h3>
      {selectedImage ? (
        <div>
          <Image
            src={selectedImage}
            alt="Add Product Image"
            width={200}
            height={200}
            className="rounded-md object-cover mb-2"
          />
          <label
            htmlFor="image-upload"
            className="border-2 border-dashed border-primary flex justify-center items-center cursor-pointer"
          >
            <Camera size={50} className="text-primary !font-light my-2" />
            <span className="mx-2">{translations.labels.changeImage}</span>
          </label>
        </div>
      ) : (
        <label
          htmlFor="image-upload"
          className="border-2 border-dashed border-primary flex justify-center items-center cursor-pointer"
        >
          <Camera size={100} className="text-primary !font-light my-4" />
        </label>
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="image-upload"
        onChange={handleImageChange}
        name="image"
      />
    </>
  );
};
