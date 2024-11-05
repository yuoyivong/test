import React from 'react';
import {Edit} from "iconsax-react";

const RenameWorkspace = () => {
    return (
        <div
            className="px-2 py-1 mx-1.5 rounded-md hover:bg-blackUi/5 cursor-pointer flex items-center justify-start gap-3 xl:gap-5"
        >
            <Edit size="20" color="#344054"/>
            <p>Rename</p>
        </div>
    );
};

export default RenameWorkspace;
