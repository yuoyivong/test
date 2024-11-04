import React from 'react';
import { MinusSquare, TickSquare } from "iconsax-react";

const CheckBox = ({ checked, onClick }) => {
    const handleClick = () => {
        onClick();
    };

    return (
        <div onClick={handleClick} className={`cursor-pointer`}>
            {checked ? (
                <TickSquare size="20" color="#344054" variant="Bold" />
            ) : (
                <MinusSquare size="20" color="#344054" />
            )}
        </div>
    );
};

export default CheckBox;
