"use client";
import { Minus, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
const PagenationButtons = ({
  pagesCount,
  page,
  currentPage,
}: {
  pagesCount: number;
  page: number;
  currentPage: number;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleNextPage = () => {
    if (pagesCount && page < pagesCount) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", (page + 1).toString());
      router.push(`?${params.toString()}`);
    }
  };

  const handlePrevPage = () => {
    if (currentPage && currentPage > 1) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", (page - 1).toString());
      router.push(`?${params.toString()}`);
    }
  };
  return (
    <div className="flex justify-between items-center my-3">
      <span
        onClick={handleNextPage}
        className={`${
          pagesCount && page < pagesCount
            ? "p-3 bg-primary hover:bg-primary/80 rounded-2xl cursor-pointer"
            : "p-3 bg-primary/50 rounded-2xl"
        } text-white`}
      >
        <Plus />
      </span>
      <h1 className="text-xl font-bold">
        {currentPage} of {pagesCount}
      </h1>
      <span
        onClick={handlePrevPage}
        className={`${
          currentPage && currentPage > 1
            ? "p-3 bg-primary hover:bg-primary/80 rounded-2xl cursor-pointer"
            : "p-3 bg-primary/50 rounded-2xl"
        } text-white`}
      >
        <Minus />
      </span>
    </div>
  );
};

export default PagenationButtons;
