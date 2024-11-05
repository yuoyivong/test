import React from 'react';
import { Trash } from "iconsax-react";

const DeleteButton = ({ onClick, isHeaderChecked }) => {
    return (
        <div
            onClick={onClick}
            className="flex items-center justify-center gap-2 bg-none border border-deleteColor h-11 rounded-radiusBorder w-32 text-xs sm:text-sm text-deleteColor cursor-pointer">
            <Trash size="20" color="#CE0000" />
            <p className={'whitespace-nowrap text-deleteColor'}>{isHeaderChecked ? "Delete All" : "Delete"}</p>
        </div>
    );
};

export default DeleteButton;
