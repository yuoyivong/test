import Image from "next/image";
import React from "react";

const ImageComponent = () => {
  // return (
  //   <div className="hidden lg:flex lg:flex-col rounded-3xl bg-primaryCherUi m-10 max-w-xl">
  //     <div className="text-blackUi mx-10 my-10 flex flex-col items-end justify-end">
  //       <h3 className="text-lg lg:text-xl xl:text-3xl font-semibold">
  //         Your space to capture ideas, ask questions, and find
  //         answers—seamlessly.
  //       </h3>
  //       <p className="text-xs lg:text-sm xl:text-base text-justify pt-5">
  //         Our hybrid app combines note-taking and Q&A, letting you capture
  //         ideas, organize insights, and find answers in one place—boosting
  //         productivity and learning.
  //       </p>
  //     </div>
  //     <Image
  //       className="rounded-2xl object-cover"
  //       src="/images/signup.png"
  //       alt="register form image"
  //       width={700}
  //       height={400}
  //     />
  //   </div>
  // );

  return (
    <div className="flex flex-col justify-between h-full absolute bottom-0 z-50">
      <div className="m-10 text-blackUi px-4 pt-12">
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
