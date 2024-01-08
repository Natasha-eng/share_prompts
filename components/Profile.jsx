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
      //session.user.id
      setLoading(true);
      const response = await fetch(`/api/users/${currentUser?.userId}/posts`);
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    };

    if (currentUser?.userId) fetchPosts();
  }, [currentUser?.userId]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post.id}`);
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
    <section className="w-full">
      <h1 className="head_text text_left">
        <span className="blue_gradient">{name}</span> Profile
      </h1>
      <p className="desc text_left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {loading ? (
          <Loading />
        ) : (
          posts.map((post) => {
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
        )}
      </div>
    </section>
  );
};

export default Profile;
