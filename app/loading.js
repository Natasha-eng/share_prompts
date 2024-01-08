import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div>
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
