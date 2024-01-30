"use client";

import { useSearchParams } from "next/navigation";
import PromptCard from "./PromptCard";
import { useMemo } from "react";

const PromptCardList = ({ data, setSearchText, currentUser }) => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  const productsPerPage = useMemo(() => {
    const show = 3;
    const from = (Number(page) - 1) * show;
    const to = from + show;
    return data.slice(from, to);
  }, [data, page]);

  return (
    <div className="flex justify-center flex-wrap mt-16 prompt_layout">
      {productsPerPage.map((post) => {
        return (
          <PromptCard
            key={post.id}
            currentUser={currentUser}
            post={post}
            setSearchText={setSearchText}
          />
        );
      })}
    </div>
  );
};

export default PromptCardList;
