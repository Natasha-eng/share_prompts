"use client";

import Form from "@components/Form";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const EditPrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
    recordId: "",
  });

  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const router = useRouter();

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
        recordId: data.recordId,
      });
    };
    if (promptId) getPromptDetails();
  }, [promptId]);

  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/api/auth/signin?callbackUrl=/create-prompt");
  //   },
  // });

  const updatePrompt = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    if (!promptId) return alert("Prompt ID not found");

    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recordId: post.recordId,
          promptObj: { prompt: post.prompt, tag: post.tag },
        }),
      });

      if (res) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
