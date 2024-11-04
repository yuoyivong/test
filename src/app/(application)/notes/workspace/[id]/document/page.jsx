"use client"

import React, {useState} from 'react';
import Title from "@/app/(application)/notes/_component/Title";
import EditorModify from '@/app/(application)/question/_components/EditorModify';

const NotesPage = () => {
    const [title, setTitle] = useState("");

    // Function to handle title submission
    const handleTitleChange = (newTitle) => {
        setTitle(newTitle);
    };
    const [saveData, setSaveData] = useState();
    const handleSaveData = (data) => setSaveData(data);

    return (
        <div className={`w-full doc-font`}>
            <div className="w-full xl:max-w-[75%] mx-auto">
                <Title onTitleChange={handleTitleChange}/>
                <div className="space-y-6 w-full">
                    <EditorModify handleSaveData={handleSaveData} title={title}/>
                </div>
            </div>
        </div>
    )
        ;
};

export default NotesPage;
