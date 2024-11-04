"use client";
import React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const Filter = ({ handleSortChange }) => {
    const handleSelected = (value) => {
        handleSortChange(value);  // Pass the selected value to the parent component
    };

    return (
        <div className="relative min-w-[90px] md:min-w-[140px] lg:min-w-[200px] flex items-center justify-between text-blackUi">
            {/*min-w-[150px] md:min-w-[200px] lg:min-w-[260px]*/}
            <Select onValueChange={handleSelected}>
                <SelectTrigger className="h-11 rounded-lg xl:rounded-radiusBorder flex items-center justify-between border border-lessBlackUi border-opacity-50 focus-visible:ring-0 focus:ring-0 text-blackUi text-xs sm:text-sm 2xl:text-base font-medium w-full appearance-none relative focus:outline-none bg-white cursor-pointer">
                    {/*<SelectValue placeholder="Updated At  (default)" />*/}
                    <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent className={'rounded-lg xl:rounded-radiusBorder'}>
                    <SelectGroup>
                        {/*<SelectItem value="titleAsc">Title (ascending)</SelectItem>*/}
                        {/*<SelectItem value="titleDesc" >Title (descending)</SelectItem>*/}
                        {/*<SelectItem value="private">Status (private)</SelectItem>*/}
                        {/*<SelectItem value="public" >Status (public)</SelectItem>*/}
                        {/*<SelectItem value="createdAt">Created At (oldest first)</SelectItem>*/}
                        <SelectItem value="titleAsc">Title (A - Z)</SelectItem>
                        <SelectItem value="titleDesc" >Title (Z - A)</SelectItem>
                        <SelectItem value="private">Private Status</SelectItem>
                        <SelectItem value="public" >Public Status</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default Filter;
