"use client";

import React, { useState, useEffect, useRef } from 'react';
import { More, Send2, Trash } from "iconsax-react";
import MoveToTrash from "@/app/(application)/notes/_component/MoveToTrash";
import ShareDocument from "@/app/(application)/notes/_component/ShareDocument";

const DocumentMore = ({doc, updateDocumentStatus, deleteDocument }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [action, setAction] = useState('');
    const dropdownRef = useRef(null);

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    };

    const handleAction = (actionType) => {
        setAction(actionType);
        setIsOpen(false);
    };

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false); // Close dropdown if clicked outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div ref={dropdownRef} className="relative">
            <div
                onClick={toggleDropDown}
                className="absolute bg-white z-10 rounded-full p-2 -top-3 -right-3 cursor-pointer"
            >
                <More size="20" color="#344054" />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-7 -right-3 z-10 border w-[10.5rem] xl:w-[12rem] bg-white shadow-md rounded-radiusBorder cursor-pointer"
                     onClick={(e) => e.stopPropagation()}> {/* Stop dropdown toggle when clicking inside */}
                    <ul className="py-2">
                        <li className={'py-1 mx-1.5 rounded-md hover:bg-blackUi/5'} onClick={() => handleAction('share')}>
                            <div className="flex items-center justify-start gap-3 mx-3">
                                <Send2 size="20" color="#344054" />
                                <p className={'md:text-sm text-xs xl:text-base font-medium text-blackUi'}>Share</p>
                            </div>
                        </li>
                        <li className={'py-1 mx-1.5 rounded-md hover:bg-blackUi/5'} onClick={() => handleAction('trash')}>
                            <div className="flex items-center justify-start gap-3 mx-3">
                                <Trash size="20" color="#CE0000" />
                                <p className={'md:text-sm text-xs xl:text-base font-medium text-deleteColor'}>Move to Trash</p>
                            </div>
                        </li>
                    </ul>
                </div>
            )}

            {/* Render forms based on action */}
            {action === 'share' && <ShareDocument onClose={() => setAction('')} docStatus={doc?.status} docId={doc?.id}  updateDocumentStatus={updateDocumentStatus}/>}
            {action === 'trash' && <MoveToTrash onClose={() => setAction('')} onConfirm={() => deleteDocument(doc.id)} />}
        </div>
    );
};

export default DocumentMore;
