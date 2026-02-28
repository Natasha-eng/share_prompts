"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Profile from "@components/Profile";

const UserProfile = async ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const { id } = await params;

  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const userData = await fetch(`/api/users/${id}/posts`);

      const currentUser = await userData.json();
      setUser(currentUser);
    };

    if (id) fetchUserPosts();
  }, [id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts.`}
      currentUser={user[0]}
    />
  );
};

export default UserProfile;
