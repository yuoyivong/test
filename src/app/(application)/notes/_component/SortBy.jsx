"use client";

import React, { useState } from 'react';
import { Sort } from "iconsax-react";

const SortBy = ({ setSortBy }) => {
    const [activeSort, setActiveSort] = useState('oldest');

    const handleSortChange = (sortType) => {
        if (sortType !== activeSort) {
            setActiveSort(sortType);
            setSortBy(sortType); // Trigger sorting in the parent component
        }
    };

    return (
        <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-end justify-between gap-3 mt-5">
            <p className="text-xs font-medium sm:text-sm">Sort By</p>
            <div className="flex flex-wrap md:flex-nowrap items-center gap-2 bg-primaryCherUi p-2 rounded-lg xl:rounded-radiusBorder">
                <div
                    className={`flex items-center gap-2 py-2 px-5 rounded-sm xl:rounded-lg cursor-pointer transition-colors duration-300 
                    ${activeSort === 'oldest' ? 'bg-white text-blackUi' : 'bg-transparent hover:bg-gray-200 text-blackUi'}`}
                    onClick={() => handleSortChange('oldest')}
                >
                    <Sort size="18" color="#344054" />
                    <p className="text-xs font-medium sm:text-sm">Old Date</p>
                </div>
                <div
                    className={`flex items-center gap-2 py-2 px-5 rounded-sm xl:rounded-lg cursor-pointer transition-colors duration-300 
                    ${activeSort === 'newest' ? 'bg-white text-blackUi' : 'bg-transparent hover:bg-gray-200 text-blackUi'}`}
                    onClick={() => handleSortChange('newest')}
                >
                    <Sort size="18" color="#344054" className={'rotate-180'} />
                    <p className="text-xs font-medium sm:text-sm">New Date</p>
                </div>
            </div>
        </div>
    );
};

export default SortBy;
