import React from 'react';
import {Refresh} from "iconsax-react";

const RecycleButton = ({ onClick, isHeaderChecked }) => {
    return (
        <div
            onClick={onClick}
            className="flex items-center justify-center gap-2 bg-blackUi border border-blackUi h-11 rounded-radiusBorder w-32 text-xs sm:text-sm text-primaryCherUi cursor-pointer">
            <Refresh size="20" color="#F4F6FA"/>
            <p className={'whitespace-nowrap text-primaryCherUi'}>{isHeaderChecked ? "Restore All" : "Restore"}</p>
        </div>
    );
};

export default RecycleButton;
