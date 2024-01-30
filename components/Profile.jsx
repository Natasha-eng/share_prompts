"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { useRouter } from "next/navigation";
import Loading from "@app/profile/laoding";

const Profile = ({ name, desc, currentUser }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await fetch(`/api/users/${currentUser?.userId}/posts`);
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    };

    if (currentUser?.userId) fetchPosts();
  }, [currentUser?.userId]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post.recordId}`);
  };

  const handleDelete = async (post) => {
    const hasCofirmed = confirm("Are you sure you want to delete this prompt?");

    if (hasCofirmed) {
      try {
        await fetch(`/api/prompt/${post.id}`, {
          method: "DELETE",
          body: JSON.stringify({
            recordId: post.recordId,
          }),
        });

        const filteredPosts = posts.filter((p) => p.id !== post.id);
        setPosts(filteredPosts);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section className="min-h-[80vh] w-full pt-[100px] flex flex-col items-center">
      <h1 className="head_text text_left">
        <span className="blue_gradient">{name}</span> Profile
      </h1>
      <p className="desc text_left">{desc}</p>

      <div className="w-full flex justify-center flex-wrap mt-16 prompt_layout">
        {loading ? (
          <Loading />
        ) : posts.length > 0 ? (
          posts?.map((post) => {
            return (
              <PromptCard
                key={post.id}
                currentUser={currentUser}
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
              />
            );
          })
        ) : (
          <div className="min-h-[9em] text-center leading-[9em]">
            Create Your Events
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
