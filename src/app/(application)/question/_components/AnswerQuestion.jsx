'use client'

import { Button } from "@/components/ui/button"
import EditorModify from "./EditorModify"
import { useState } from "react";

export const AnswerQuestion = () => {

    const [saveData, setSaveData] = useState();
    const handleSaveData = (data) => setSaveData(data);

    return (
        <section>
            <h2 className="text-2xl font-medium text-blackUi mb-6">Answer</h2>
            <div className="p-4 rounded-radiusUi border border-[#CED4DA]">
                <EditorModify handleSaveData={handleSaveData} writable={true} />
            </div>
            <div className="w-full flex justify-end">
                <Button
                    type="submit"
                    className="mt-6 text-end text-xs xl:text-base rounded-xl text-blackUi border-lessBlackUi bg-lessWhiteUi xl:w-[130px] xl:h-[44px] hover:bg-lessWhiteUi"
                    variant="outline">
                    Answer
                </Button>
            </div>
        </section>
    )
}