// ** Option Field components

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Translations } from "@/interfaces/translations";
import { Extra, ExtraIngrediants, ProductSize, Size } from "@prisma/client";

import { Plus, Trash } from "lucide-react";

// common type
type Item = Partial<Size> | Partial<Extra>;

// reusable generic component
type MoreDetailsProps<T extends Item> = {
  slug: "sizes" | "extras";
  options: T[];
  setOptions: React.Dispatch<React.SetStateAction<T[]>>;
  translations: Translations;
  isEditMode: boolean;
};

export const MoreDetails = <T extends Item>({
  slug,
  options,
  setOptions,
  translations,
  isEditMode,
}: MoreDetailsProps<T>) => {
  const isSize = slug === "sizes";

  return (
    <Accordion
      type="single"
      collapsible
      className="w-[fit-content]"
      value={isEditMode ? "item-1" : undefined}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-2xl font-bold">
          {isSize ? translations.labels.size : translations.labels.extra}
        </AccordionTrigger>
        <AccordionContent>
          {options.map((_, index) => (
            <Details
              key={index}
              setOptions={setOptions}
              options={options}
              index={index}
              isSize={isSize}
              translations={translations}
            />
          ))}

          {options.length <= (isSize ? 2 : 3) && (
            <Button
              type="button"
              className="w-full mt-3"
              onClick={() =>
                setOptions((prev) => [
                  ...prev,
                  { name: "", price: 0 } as unknown as T,
                ])
              }
            >
              <Plus />{" "}
              {isSize
                ? translations.labels.addSize
                : translations.labels.addExtra}
            </Button>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

type DetailsProps<T extends Item> = {
  setOptions: React.Dispatch<React.SetStateAction<T[]>>;
  options: T[];
  index: number;
  isSize: boolean;
  translations: Translations;
};

const Details = <T extends Item>({
  setOptions,
  options,
  index,
  isSize,
  translations,
}: DetailsProps<T>) => {
  const handleNameChange = (value: string) => {
    setOptions((prev) =>
      prev.map((item, i) => (i === index ? { ...item, name: value } : item))
    );
  };

  const handlePriceChange = (value: string) => {
    setOptions((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, price: Number(value) } : item
      )
    );
  };

  return (
    <div className="flex justify-center items-center gap-3">
      <div>
        <h1>{translations.labels.name}</h1>
        <Select
          value={options[index].name || ""}
          onValueChange={handleNameChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue
              placeholder={
                isSize
                  ? translations.labels.sizeName
                  : translations.labels.extraName
              }
            />
          </SelectTrigger>
          <SelectContent>
            {(isSize
              ? Object.entries(ProductSize)
              : Object.entries(ExtraIngrediants)
            ).map(([key, value]) => (
              <SelectItem key={key} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>{translations.labels.sizePrice}</Label>
        <Input
          type="text"
          placeholder={translations.labels.sizePrice}
          value={options[index].price}
          onChange={(e) => handlePriceChange(e.target.value)}
        />
      </div>
      <div
        className="rounded-md p-2 cursor-pointer hover:bg-accent text-red-400 hover:text-red-300 mt-3"
        onClick={() => {
          setOptions((prev) => prev.filter((_, i) => i !== index));
        }}
      >
        <Trash />
      </div>
    </div>
  );
};
