"use client";

import Link from "next/link";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import { useUploadThing } from "@lib/uploadthing";
import { createPrompt } from "@lib/actions";
import { Label, ListBox, Select } from "@heroui/react";
import { eventTypes } from "@lib/data";

const CreateForm = ({ type }) => {
  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState([]);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
    url: "",
    type: "Cultural",
    location: "",
    price: "",
  });

  const handleSelectionChange = (value) => {
    setPost((post) => {
      return { ...post, type: value };
    });
  };

  let { startUpload } = useUploadThing("imageUploader");

  const createPromptHandler = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      let uploadImages = await startUpload(files);
F
      if (!uploadImages) {
        return;
      }

      let uploadedImageUrl = uploadImages[0]?.url;

      const data = await createPrompt(
        post.prompt,
        post.tag,
        post.type,
        post.price,
        post.location,
        uploadedImageUrl,
      );
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-[80vh] w-full pt-25 max-w-full flex-center flex-col">
      <h1 className="head_text text-center">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text_center">
        {type} and share amazing events with the world, and let your imagination
        run wild with any AI-powered plarform.
      </p>

      <form
        onSubmit={createPromptHandler}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorfism"
      >
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Your AI Event
        </span>
        <div>
          <Select
            isRequired
            name="type"
            label="Event Type"
            placeholder="Select type"
            value={post.type}
            className="max-w-xs"
            onChange={handleSelectionChange}
            variant="secondary"
          >
            <Label>Event Type</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {eventTypes.map((type) => (
                  <ListBox.Item
                    key={type.value}
                    id={type.value}
                    textValue={type.value}
                  >
                    {type.value}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          <div className="mt-4 sm:flex flex-row gap-4">
            <input
              value={post.price}
              onChange={(e) => setPost({ ...post, price: e.target.value })}
              type="text"
              placeholder="Price"
              name="price"
              required
              className="form_input"
            />
            <input
              value={post.location}
              onChange={(e) => setPost({ ...post, location: e.target.value })}
              type="text"
              name={"location"}
              placeholder="Location"
              required
              className="form_input"
            />
          </div>

          <FileUploader url={post.url} setFiles={setFiles} />

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your post here"
            name="description"
            required
            className="form_textarea"
          />
        </div>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Field of Event{" "}
            <span className="font-normal">
              (product, webdevelopment, idea, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type="text"
            name="tag"
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
            className="px-5 py-1.5 text-sm bg-indigo-500 hover:bg-fuchsia-500 rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateForm;
