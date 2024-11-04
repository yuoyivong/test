"use client";

import { Button } from "@/components/ui/button";
import { FancyMultiSelect } from "./../_components/FancyMultiSelect";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
const EditorModify = dynamic(() => import("../../_components/EditorModify"), {
  ssr: false,
});

const Page = () => {
  const [saveData, setSaveData] = useState();
  const handleSaveData = (data) => setSaveData(data);
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-full space-y-8 md:px-8 xl:px-16">
      <h2 className="text-2xl md:text-3xl font-semibold text-blackUi">
        Asking Question
      </h2>
      <div className="w-full space-y-2">
        <p className="text-blackUi">Tags</p>
        <FancyMultiSelect className={"w-full"} />
      </div>
      <div className="md:px-16 xl:px-24">
        {/* <div>
                    <pre>
                        check save data here
                        <code>{JSON.stringify(saveData, null, 2)}</code>
                    </pre>
                </div> */}
        <div className="flex flex-col justify-between">
          <input
            type="text"
            placeholder="Title"
            className="px-[54px] input-gg mb-10 text-blackUi outline-none placeholder:font-light focus:ring-0 placeholder:text-3xl md:placeholder:text-3xl xl:placeholder:text-5xl placeholder:text-[#D4D4D8] h-[48px] text-3xl md:text-3xl xl:text-5xl font-semibold w-auto"
          />
          <EditorModify handleSaveData={handleSaveData} writable={true} />
          <div className="w-full text-end">
            {/* <Link href={'/question'}> */}
            <Button
              onClick={() => router.back()}
              className="mt-6 text-xs xl:text-base rounded-xl border-lessBlackUi bg-lessWhiteUi xl:w-[130px] xl:h-[44px] hover:bg-lessWhiteUi"
              variant="outline"
            >
              Submit
            </Button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
