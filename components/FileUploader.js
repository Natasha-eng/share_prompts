"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";

import Image from "next/image";
import { convertFileToUrl } from "@utils/utils";

export function FileUploader({ url, setFiles }) {
  const [convertedFile, setConvertedFile] = useState(url);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    setConvertedFile(convertFileToUrl(acceptedFiles[0]));
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });
  return (
    <div
      {...getRootProps()}
      className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50"
    >
      <input
        {...getInputProps()}
        onChange={() => {}}
        className="cursor-pointer"
      />

      {url?.length > 0 ? (
        <div className="flex h-full w-full flex-1 justify-center ">
          <Image
            src={convertedFile || "/images/upload.svg"}
            alt="image"
            name="uploadImg"
            width={250}
            height={250}
            className="rounded-xl"
          />
        </div>
      ) : (
        <div className="flex-center flex-col py-5 text-grey-500">
          <Image
            src={convertedFile || "/images/upload.svg"}
            name="uploadImg"
            width={77}
            height={77}
            alt="file upload"
            className="rounded-xl"
          />
          <h3 className="mb-2 mt-2">Drag photo here</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          <button type="button">Select from computer</button>
        </div>
      )}
    </div>
  );
}
