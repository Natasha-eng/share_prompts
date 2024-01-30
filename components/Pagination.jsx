"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

const Pagination = ({ count }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = searchParams.get("page") || 1;

  const params = new URLSearchParams(searchParams);
  const ITEM_PER_PAGE = 3;

  const hasPrev = useMemo(() => {
    return ITEM_PER_PAGE * (parseInt(page) - 1) > 0;
  }, [page]);

  const hasNext = useMemo(() => {
    return ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count;
  }, [page, count]);

  const handleChangePage = (type) => {
    type === "prev"
      ? params.set("page", parseInt(page) - 1)
      : params.set("page", parseInt(page) + 1);
    replace(`${pathname}?${params}`);
  };

  return (
    <div className="w-full mb-5 flex justify-center gap-5">
      <button
        className="disabled:opacity-75 text-center rounded bg-emerald-500 cursor-pointer py-2 px-5 w-28 md:py-3 md:px-7"
        disabled={!hasPrev}
        onClick={() => handleChangePage("prev")}
      >
        Previous
      </button>
      <button
        className="disabled:opacity-75 text-center rounded bg-emerald-500 cursor-pointer py-2 px-5 w-28 md:py-3 md:px-7"
        disabled={!hasNext}
        onClick={() => handleChangePage("next")}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
