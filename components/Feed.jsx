"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Loading from "@app/loading";
import Pagination from "./Pagination";
import Search from "./Search";
import PromptCardList from "./PromptCardList";

const Feed = ({ currentUser, posts }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(posts);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearchChange = useCallback(
    (e) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", 1);
      replace(`${pathname}?${params}`.toLowerCase());
      setSearchText(e.target.value);
    },
    [searchParams, replace, pathname]
  );

  useEffect(() => {
    const id = setTimeout(() => {
      setLoading(true);
      const regex = new RegExp(searchText, "i");

      const filteredPosts = posts.filter(
        (item) =>
          regex.test(item.username) ||
          regex.test(item.tag) ||
          regex.test(item.prompt)
      );

      setSearchResults(filteredPosts);
      setCount(Math.ceil(filteredPosts.length));
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(id);
    };
  }, [searchText, posts]);

  let content;
  if (searchResults.length <= 0) {
    content = (
      <div className="min-h-[17em] text-center leading-[17em]">
        No Events Found
      </div>
    );
  } else {
    content = loading ? (
      <>
        <Loading />
      </>
    ) : searchText ? (
      <PromptCardList
        currentUser={currentUser}
        data={searchResults}
        setSearchText={setSearchText}
      />
    ) : (
      <PromptCardList
        currentUser={currentUser}
        data={posts}
        setSearchText={setSearchText}
      />
    );
  }

  return (
    <section className="feed">
      <Search searchText={searchText} handleSearchChange={handleSearchChange} />

      {content}

      <Pagination count={count} />
    </section>
  );
};

export default Feed;
