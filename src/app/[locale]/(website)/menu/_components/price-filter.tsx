"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const PriceFilter = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  const [price, setPrice] = useState({
    minPrice: params.get('minPrice') ?? "",
    maxPrice: params.get('maxPrice') ?? "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const min = Number(price.minPrice);
    const max = Number(price.maxPrice);

    if ((!min && !max) || min >= max) {
      setLoading(false);
      return setError(true);
    }
    params.set("minPrice", price.minPrice);
    params.set("maxPrice", price.maxPrice);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
    setLoading(false);
  };
  return (
    <div className="mt-3 ">
      <h1 className="text-xl text-secondary font-bold">Prices:</h1>

      <form onSubmit={handleSubmit} className="my-5 flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Label>Min Price</Label>
          <Input
            type="number"
            name="min"
            placeholder="Min Price..."
            value={price.minPrice}
            onChange={(e) =>
              setPrice((prev) => ({ ...prev, minPrice: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Max Price</Label>
          <Input
            type="number"
            name="max"
            placeholder="Max Price..."
            value={price.maxPrice}
            onChange={(e) =>
              setPrice((prev) => ({ ...prev, maxPrice: e.target.value }))
            }
          />
        </div>
        {error && (
          <p className="font-semibold text-red-600">somethingWentWrong</p>
        )}
        <Button className="w-full mt-3" type="submit">
          {loading && (
            <span className="animate-spin text-white">
              <Loader />
            </span>
          )}
          Filter By Price
        </Button>
      </form>
    </div>
  );
};

export default PriceFilter;
