"use client";

import QuestionState from "../_components/QuestionStat";
import data from "../../../../data/blocknote.json";
import { QuestionAnswer } from "../_components/QuestionAnswer";
import Editor from "../_components/Editor";
import { AnswerQuestion } from "../_components/AnswerQuestion";
import { PublicPopup } from "@/components/sidebar/PublicPopup";
import { useEffect, useState } from "react";

const Page = ({ params }) => {
  let docTitle = data?.payload[params.id - 1]?.doc
    ?.filter((x) => x?.type == "heading")
    ?.map((heading) => heading?.content[0]?.content[0].text);

  const [auth, setAuth] = useState();

  useEffect(() => {
    const gg = JSON.parse(localStorage.getItem("auth"));
    setAuth(gg);
  }, []);

  return (
    <div className={`w-full doc-font`}>
      <div className="w-full xl:max-w-[75%] mx-auto">
        <h2 className="textxl xl:text-3xl text-blackUi font-bold lg:font-medium mt-4 lg:mt-8">
          {docTitle != "" ? docTitle : "No Title"}
        </h2>
        <QuestionState
          className={"mt-3 mb-8 lg:mb-8"}
          date={"06 Oct 2024"}
          author={"Mega"}
          stack={"Spring Boot"}
        />
        <div className="space-y-6 w-full">
          <Editor
            writable={false}
            data={data?.payload[params.id - 1]?.doc?.filter(
              (x) => x?.type !== "heading"
            )}
          />
          <hr />
          <div className="flex items-center text-blackUi text-lg space-x-2">
            <span>1</span>
            <h2>Answer</h2>
          </div>
          <section className="lg:pl-16 space-y-8 w-full overflow-scroll">
            <QuestionAnswer rate={5} />
          </section>
          {auth ?
            <AnswerQuestion /> :
            <PublicPopup>
              <AnswerQuestion />
            </PublicPopup>
          }
        </div>
      </div>
    </div>
  );
};

export default Page;
