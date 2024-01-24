"use client";

import Link from "next/link";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import { useUploadThing } from "@lib/uploadthing";
import { createPrompt } from "@lib/actions";

const CreateForm = ({ type }) => {
  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState([]);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
    url: "",
  });

  let { startUpload } = useUploadThing("imageUploader");

  const createPromptHandler = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    try {
      let uploadImages = await startUpload(files);

      if (!uploadImages) {
        return;
      }

      let uploadedImageUrl = uploadImages[0].url;

      const data = await createPrompt(post.prompt, post.tag, uploadedImageUrl);
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text_left max-w-md">
        {type} and share amazing events with the world, and let your imagination
        run wild with any AI-powered plarform.
      </p>

      <form
        onSubmit={createPromptHandler}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorfism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Event
          </span>

          <FileUploader url={post.url} setFiles={setFiles} />

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your post here"
            required
            className="form_textarea "
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Field of Prompt{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type="text"
            placeholder="#Tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateForm;
