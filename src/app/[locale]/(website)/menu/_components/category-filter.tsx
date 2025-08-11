"use client";
import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";

const CategoryFilter = ({ categories }: { categories: Category[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [active, setActive] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    setActive(params.get("categoryId") ?? "");
  }, [searchParams]);

  const handleClick = (categoryId: string) => {
    if (categoryId === active) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("categoryId");
      params.set("page", "1");
      router.push(`?${params.toString()}`);
      return setActive("");
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set("categoryId", categoryId);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mt-3 ">
      <h1 className="text-xl text-secondary font-bold">Categories:</h1>
      <div className="my-5 flex flex-wrap gap-3">
        {categories.map((category) => (
          <Button
            variant={category.id === active ? "default" : "outline"}
            key={category.id}
            onClick={() => handleClick(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
