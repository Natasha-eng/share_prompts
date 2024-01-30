import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="flex-center">
      <Image
        src="/loader/my-loader.svg"
        alt="loader"
        width={100}
        height={100}
      />
    </div>
  );
};

export default Loading;
