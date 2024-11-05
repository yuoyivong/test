import React, { useState, useEffect } from 'react';

const Title = ({ onTitleChange, initialTitle }) => {
    const [title, setTitle] = useState(initialTitle || "");
    const [isTitleEditing, setIsTitleEditing] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // Notify parent of title change
        onTitleChange(title);
    }, [title]);

    const handleTitleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (title.trim().length < 1) {
                setError("Title cannot be empty");
            } else {
                setError("");
                setIsTitleEditing(false);
            }
        }
    };

    return (
        <>
            {isTitleEditing ? (
                <div className={'w-full mb-5 overflow-hidden'}>
                    <input
                        className="border-none my-5 text-[3rem] md:mx-[18px] text-left focus:outline-none focus:ring-0 font-semibold text-blackUi w-full"
                        type="text"
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            setError("");
                        }}
                        onKeyDown={handleTitleKeyDown}
                        required
                        style={{ marginBottom: "10px" }}
                    />
                    {error && <p className="text-red-500 text-xs my-5 md:mx-[18px] text-left">{error}</p>}
                </div>
            ) : (
                <h1
                    className="text-[3rem] font-semibold text-blackUi cursor-pointer my-5 md:mx-[18px] text-left"
                    onClick={() => setIsTitleEditing(true)}
                    style={{ marginBottom: "10px" }}
                >
                    {title || "Enter title"}
                </h1>
            )}
        </>
    );
};

export default Title;
