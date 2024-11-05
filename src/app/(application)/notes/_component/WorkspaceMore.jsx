'use client';
import React, {useEffect, useRef, useState} from 'react';
import DeleteWorkspace from "@/app/(application)/notes/_component/DeleteWorkspace";
import RenameWorkspace from "@/app/(application)/notes/_component/RenameWorkspace";
import InviteWorkspace from "@/app/(application)/notes/_component/InviteWorkspace";
import DeleteWorkspacePopup from "@/app/(application)/notes/_component/DeleteWorkspacePopup";
import RenamePopup from "@/app/(application)/notes/_component/RenamePopup";
import InviteMember from "@/app/(application)/notes/_component/InviteMember";

const WorkspaceMore = ({ workspace, deleteWorkspace }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [action, setAction] = useState('');
    const dropdownRef = useRef(null);

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    };

    const handleAction = (actionType) => {
        setAction(actionType);
        setIsOpen(false); // Close dropdown after selection
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
        <div ref={dropdownRef} className={'mt-5'}>
            <div  onClick={toggleDropDown} className={'cursor-pointer'}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="8" fill="#F4F6FA"/>
                    <path
                        d="M25.5401 16.3099C26.8987 16.3099 28.0001 15.2085 28.0001 13.8499C28.0001 12.4913 26.8987 11.3899 25.5401 11.3899C24.1814 11.3899 23.0801 12.4913 23.0801 13.8499C23.0801 15.2085 24.1814 16.3099 25.5401 16.3099Z"
                        stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                        stroke-linejoin="round"/>
                    <path
                        d="M14.46 16.3099C15.8186 16.3099 16.92 15.2085 16.92 13.8499C16.92 12.4913 15.8186 11.3899 14.46 11.3899C13.1014 11.3899 12 12.4913 12 13.8499C12 15.2085 13.1014 16.3099 14.46 16.3099Z"
                        stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                        stroke-linejoin="round"/>
                    <path
                        d="M25.5401 28.6099C26.8987 28.6099 28.0001 27.5086 28.0001 26.1499C28.0001 24.7913 26.8987 23.6899 25.5401 23.6899C24.1814 23.6899 23.0801 24.7913 23.0801 26.1499C23.0801 27.5086 24.1814 28.6099 25.5401 28.6099Z"
                        stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                        stroke-linejoin="round"/>
                    <path
                        d="M14.46 28.6099C15.8186 28.6099 16.92 27.5086 16.92 26.1499C16.92 24.7913 15.8186 23.6899 14.46 23.6899C13.1014 23.6899 12 24.7913 12 26.1499C12 27.5086 13.1014 28.6099 14.46 28.6099Z"
                        stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                        stroke-linejoin="round"/>
                </svg>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-50 right-[7.5rem] mt-2 border w-36 xl:min-w-48 bg-white shadow-md rounded-radiusBorder"
                     onClick={(e) => e.stopPropagation()}> {/* Stop dropdown toggle when clicking inside */}
                    <ul className="py-2 text-xs sm:text-sm xl:text-base">
                        <li onClick={() => handleAction('invite')}><InviteWorkspace/></li>
                        <li onClick={() => handleAction('rename')}><RenameWorkspace/></li>
                        <li onClick={() => handleAction('delete')}><DeleteWorkspace/></li>
                    </ul>
                </div>
            )}

            {/* Render forms based on action */}
            {action === 'invite' && <InviteMember onClose={() => setAction('')}/>}
            {action === 'rename' && <RenamePopup workspaceName={workspace.workspaceName} onClose={() => setAction('')}/>}
            {action === 'delete' && (
                <DeleteWorkspacePopup
                    onClose={() => setAction('')}
                    onConfirm={() => deleteWorkspace(workspace?.id)}
                />
            )}

        </div>
    );
};

export default WorkspaceMore;
