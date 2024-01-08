"use client";

import { useCallback, useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import Loading from "@app/loading";

const PromptCardList = ({ data, setSearchText }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return (
          <PromptCard key={post.id} post={post} setSearchText={setSearchText} />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = useCallback((e) => {
    setSearchText(e.target.value);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      const regex = new RegExp(searchText, "i");
      const filteredPosts = posts.filter(
        (item) =>
          regex.test(item.username) ||
          regex.test(item.tag) ||
          regex.test(item.prompt)
      );

      setSearchResults(filteredPosts);
    }, 500);

    return () => {
      clearTimeout(id);
    };
  }, [searchText, posts]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await fetch("/api/prompt", { cache: "no-store" });
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {loading ? (
        <>
          <Loading />
        </>
      ) : searchText ? (
        <PromptCardList data={searchResults} setSearchText={setSearchText} />
      ) : (
        <PromptCardList data={posts} setSearchText={setSearchText} />
      )}
    </section>
  );
};

export default Feed;
