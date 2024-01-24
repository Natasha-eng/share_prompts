"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PromptCard = ({
  post,
  handleEdit,
  handleDelete,
  setSearchText,
  currentUser
}) => {
  const [copied, setCopied] = useState("");
  // const [currentUser, setCurrentUser] = useState(null);

  const pathName = usePathname();
  const router = useRouter();

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const currentUserData = await fetch("/api/isAuth");
  //     const user = await currentUserData.json();
  //     setCurrentUser(user);
  //   };

  //   fetchUserData();
  // }, []);

  const handleTagClick = () => {
    setSearchText(post.tag);
  };

  const handleProfileClick = () => {
    if (String(currentUser.userId) === post.userId) {
      return router.push("/profile");
    }
    router.push(`/profile/${post.userId}?name=${post.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    //copy to the clipboard
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 2000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex flex-col cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.img || "/images/upload.svg"}
            width={200}
            height={200}
            alt="event-img"
          />
          <h3 className="font-satoshi font-semibold text-grey-900">
            {post.username}
          </h3>
          <p className="font-inter text-sm text-grey-500">{post.prompt}</p>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied === post.prompt ? "/icons/tick.svg" : "/icons/copy.svg"}
            width={12}
            height={12}
            alt="copy_image"
          />
        </div>
      </div>

      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick()}
      >
        {" "}
        #{post.tag}
      </p>
      {String(currentUser?.userId) === String(post?.userId) &&
        pathName === "/profile" && (
          <div className="mt-5 flex-center gap-4 border-t border-grey-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )}
    </div>
  );
};

export default PromptCard;
