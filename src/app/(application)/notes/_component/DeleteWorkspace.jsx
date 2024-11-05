import React from 'react';
import {Trash} from "iconsax-react";

const DeleteWorkspace = () => {
    return (
        <div
            className="px-2 py-1 mx-1.5 rounded-md hover:bg-blackUi/5 cursor-pointer flex items-center justify-start gap-3 xl:gap-5 text-deleteColor"
        >
            <Trash size="20" color="#CE0000"/>
            <p className={'text-deleteColor'}>Delete</p>
        </div>
    );
};

export default DeleteWorkspace;
