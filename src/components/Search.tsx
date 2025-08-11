"use client";
import { BrushCleaning, Loader, SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [serachValue, setSerachValue] = useState("");
  const [open, setOpen] = useState(false);
  const [debounceQuery, setDebounceQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const debounce = setTimeout(() => {
      setDebounceQuery(serachValue);
      setLoading(false);
    }, 500);

    return () => clearTimeout(debounce);
  }, [serachValue]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debounceQuery.length === 0) {
      params.delete("search");
    } else {
      params.set("search", debounceQuery);
    }
    router.push(`?${params.toString()}`);
  }, [debounceQuery]);

  return (
    <div className="relative flex items-center">
      <span
        className="cursor-pointer hover:bg-primary/5 p-2 rounded-full transition-colors duration-200"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? (
          loading ? (
            <Loader className="text-primary font-semibold animate-spin" />
          ) : (
            <BrushCleaning
              className="text-primary font-semibold"
              onClick={() => setDebounceQuery("")}
            />
          )
        ) : (
          <SearchIcon className="text-primary font-semibold" />
        )}
      </span>
      <div className="relative">
        <Input
          type="text"
          autoFocus={open}
          placeholder="search..."
          className={`absolute right-10 top-[-15px] w-[220px] sm:w-[250px] py-2 px-4 rounded-full shadow-lg bg-white border border-primary/20 text-primary placeholder:text-gray-400 transition-all duration-300 ease-in-out
            ${
              open
                ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
                : "opacity-0 scale-90 translate-x-10 pointer-events-none"
            }
          `}
          style={{ zIndex: 10 }}
          value={serachValue}
          onChange={(e) => setSerachValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
