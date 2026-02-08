"use client";

import Link from "next/link";
import { useState } from "react";
import { FileUploader } from "./FileUploader";
import { useUploadThing } from "@lib/uploadthing";
import { Label, ListBox, Select } from "@heroui/react";
import { updatePrompt } from "@lib/actions";
import { eventTypes } from "@lib/data";

const UpdateForm = ({ type, promptDetails, promptId }) => {
  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState([]);
  const [post, setPost] = useState({
    recordId: promptDetails.recordId,
    prompt: promptDetails.prompt,
    tag: promptDetails.tag.join(" "),
    url: promptDetails.img,
    type: promptDetails.type,
    price: promptDetails.price,
    location: promptDetails.location,
  });

  let { startUpload } = useUploadThing("imageUploader");

  const handleSelectionChange = (e) => {
    setPost({ ...post, type: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    if (!promptId) return alert("Prompt ID not found");
    try {
      let uploadImages = "";
      if (files.length > 0) {
        uploadImages = await startUpload(files);
      }
      let uploadedImageUrl = uploadImages[0]?.url;

      const ojectToUpdate = {
        prompt: post.prompt,
        tag: post.tag,
        img: uploadedImageUrl,
        price: post.price,
        location: post.location,
        type: post.type,
      };

      const updated = await updatePrompt(post.recordId, ojectToUpdate);
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
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorfism"
      >
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Your AI Event
        </span>
        <div>
          <Select
            isRequired
            label="Event Type"
            placeholder="Select type"
            value={post.type}
            className="max-w-xs mb-6"
            variant="secondary"
            onChange={handleSelectionChange}
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

          <div className="mt-4 mb-4 sm:flex flex-row gap-4">
            <input
              value={post.price}
              onChange={(e) => setPost({ ...post, price: e.target.value })}
              type="text"
              placeholder="Price"
              required
              className="form_input"
            />
            <input
              value={post.location}
              onChange={(e) => setPost({ ...post, location: e.target.value })}
              type="text"
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
            required
            className="form_textarea "
          />
        </div>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Field of Event Tag{" "}
            <span className="font-normal">
              (product, webdevelopment, idea, etc.)
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
          <Link href="/" className="text-red-500 hover:text-red-900 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-indigo-500 hover:bg-fuchsia-500 bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default UpdateForm;
