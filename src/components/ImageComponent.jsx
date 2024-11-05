import Image from "next/image";
import React from "react";

const ImageComponent = () => {
  return (
    <div className="flex flex-col justify-between h-full absolute bottom-0 z-50">
      <div className="mx-10 mt-10 text-blackUi px-4 pt-12">
        <h3
          className="text-xl md:text-5xl font-semibold my-5"
          style={{ lineHeight: "1.2" }}
        >
          Your space to capture ideas, ask questions, and find
          answers—seamlessly.
        </h3>
        <p className="text-sm md:text-base mb-6 text-justify">
          Our hybrid app combines note-taking and Q&A, letting you capture
          ideas, organize insights, and find answers in one place—boosting
          productivity and learning.
        </p>
      </div>
      <div className="w-full justify-start">
        <Image
          className="rounded-2xl mx-auto object-fill"
          src="/images/signup.png"
          alt="register form image"
          width={700}
          height={500}
        />
      </div>
    </div>
  );
};

export default ImageComponent;
