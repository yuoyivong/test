"use client";
import React, {useState} from 'react';
import data from "../../../../../../../data/document.json";
import Title from "@/app/(application)/notes/_component/Title";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import EditorModify from '@/app/(application)/question/_components/EditorModify';

const Page = ({params: {slug}}) => {
    const titleText = data?.payload[slug - 1]?.title || "";
    const [title, setTitle] = useState(titleText);
    // Extract document content
    const documentData = data?.payload[slug - 1]?.doc || [];

    // Handle title changes from the Title component
    const handleTitleChange = (newTitle) => {
        setTitle(newTitle);
    };

    const [saveData, setSaveData] = useState();
    const handleSaveData = (data) => setSaveData(data);

    return (
        <div className={`w-full doc-font`}>
            <div className="w-full xl:max-w-[75%] mx-auto">
                <Title onTitleChange={handleTitleChange} initialTitle={titleText}/>
                <div className="space-y-6 w-full">
                    <EditorModify handleSaveData={handleSaveData} data={documentData}/>
                </div>
            </div>
        </div>
    )
        ;
};

export default Page;
