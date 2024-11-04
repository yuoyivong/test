import React from 'react';
import {UserAdd} from "iconsax-react";

const InviteWorkspace = () => {
    return (
        <div
            className="px-2 py-1 mx-1.5 rounded-md hover:bg-blackUi/5 cursor-pointer flex items-center justify-start gap-3 xl:gap-5 "
        >
            <UserAdd size="20" color="#344054"/>
            <p>Invite</p>
        </div>
    );
};

export default InviteWorkspace;
