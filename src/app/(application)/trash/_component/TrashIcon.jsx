import React from 'react';
import { Trash } from "iconsax-react";

const TrashIcon = ({ onClick }) => {
    return (
        <Trash size="20" color="#CE0000" onClick={onClick} />
    );
};

export default TrashIcon;
