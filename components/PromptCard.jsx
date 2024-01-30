"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const PromptCard = ({
  post,
  handleEdit,
  handleDelete,
  setSearchText,
  currentUser,
}) => {
  const [copied, setCopied] = useState("");
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const handleTagClick = (t) => {
    if (pathName.includes("/profile") || pathName.includes("/event")) {
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.set("page", 1);
    router.replace(`${pathName}?${params}`.toLowerCase());
    setSearchText(t);
  };

  const handleProfileClick = () => {
    if (pathName.includes("/profile")) {
      return;
    }
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

  const handleEventProfile = () => {
    router.push(`/event/${post.recordId}`);
  };

  return (
    <div className="w-full prompt_card">
      <div className="copy_btn" onClick={handleCopy}>
        <Image
          src={copied === post.prompt ? "/icons/tick.svg" : "/icons/copy.svg"}
          width={12}
          height={12}
          alt="copy_image"
        />
      </div>

      <div className="flex items-center flex-col">
        <div className="w-full md:w-auto flex mb-2 md:flex-col">
          <Image
            onClick={handleProfileClick}
            src={post.img || "/images/upload.svg"}
            width={200}
            height={200}
            alt="event-img"
            className="w-[50px] h-[50px] border border-black rounded-full md:w-[200px] md:h-[200px] md:rounded cursor-pointer"
          />
          <h3
            onClick={handleProfileClick}
            className="my-3 ml-3 md:ml-0 font-satoshi font-semibold text-grey-900 cursor-pointer"
          >
            <span className="font-semibold">Creator:</span> {post.username}
          </h3>
        </div>

        <div className="w-full cursor-pointer" onClick={handleEventProfile}>
          <p className="truncate font-inter text-sm text-grey-500">
            {post.prompt}
          </p>
          <div className="mt-1 mb-4 font-semibold">See More...</div>
        </div>
        <div className="w-full">
          {" "}
          <span className="font-semibold">Event Type:</span> {post.type}
        </div>
        <div className="w-full">
          <span className="font-semibold">Tags:</span>
          <p className="flex flex-wrap gap-3 text-left font-inter text-sm blue_gradient">
            {post?.tag
              ? post?.tag.map((t, i) => {
                  return (
                    <span
                      className="cursor-pointer"
                      key={i}
                      onClick={() => handleTagClick && handleTagClick(t)}
                    >
                      #{t}
                    </span>
                  );
                })
              : ""}
          </p>
        </div>
      </div>

      {String(currentUser?.userId) === String(post?.userId) &&
        pathName === "/profile" && (
          <div className="mt-1 flex-center gap-4 border-t border-grey-100 pt-2">
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
