"use client";

import React, {useState, useMemo, useEffect} from 'react';
import data from '@/data/data.json';
import DeleteButton from "@/app/(application)/trash/_component/DeleteButton";
import RecycleButton from "@/app/(application)/trash/_component/RecycleButton";
import Pagination from "@/app/(application)/trash/_component/Pagination";
import PopupForm from "@/app/(application)/trash/_component/PopupForm";
import Search from "@/app/(application)/trash/_component/Search";
import Filter from "@/app/(application)/trash/_component/Filter";
import RecycleBin from "@/app/(application)/trash/_component/RecycleBin";

const TrashPageComponent = () => {
    const initialRecycleData = data?.recycle_data || [];
    const [recycleData, setRecycleData] = useState(initialRecycleData);
    const [filteredData, setFilteredData] = useState(initialRecycleData);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 6;

    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [actionType, setActionType] = useState(null);
    const [checkedItems, setCheckedItems] = useState([]);
    const [isHeaderChecked, setIsHeaderChecked] = useState(false);
    const [isAlreadyDeleted, setIsAlreadyDeleted] = useState(false);
    const [currentSort, setCurrentSort] = useState(null);


    const currentRecords = useMemo(() => {
        return filteredData.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);
    }, [filteredData, currentPage]);

    const handleClosePopup = () => {
        setPopupVisible(false);
        setSelectedItem(null);
        setActionType(null);
    };

    const handleCheckChange = (checkedRows) => {
        setCheckedItems(checkedRows);
        setIsHeaderChecked(checkedRows.length === currentRecords.length); // Update header checkbox state
        setIsAlreadyDeleted(false);
    };

    const handleActionConfirmed = () => {
        const updatedData = (item) =>
            !checkedItems.includes(item.id) && (!selectedItem || item.id !== selectedItem.id);

        const newRecycleData = recycleData.filter(updatedData);
        setRecycleData(newRecycleData);

        const filtered = newRecycleData.filter(item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredData(filtered.length > 0 ? filtered : newRecycleData);

        // Check if filteredData is empty and reset searchTerm if necessary
        if (filtered.length === 0) {
            setSearchTerm(''); // Reset search term
            setFilteredData(newRecycleData); // Optionally reset filteredData to show all
        }

        setCheckedItems([]);
        setIsHeaderChecked(false); // Uncheck header checkbox after action
        setIsAlreadyDeleted(true);
        handleClosePopup();
    };

    const handleIconClick = (item, action) => {
        const newCheckedItems = [item.id]; // Only check the clicked item
        setCheckedItems(newCheckedItems);
        setSelectedItem(item);
        setActionType(action);
        setPopupVisible(true);
        setIsHeaderChecked(false); // Explicitly uncheck the header when clicking an icon
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Reset checked items when the current page changes
    useEffect(() => {
        setCheckedItems([]);
        setIsHeaderChecked(false);
    }, [currentPage]);

    const handleHeaderCheck = () => {
        const allChecked = checkedItems.length === currentRecords.length;
        const newCheckedItems = allChecked ? [] : currentRecords.map(item => item.id); // Check/uncheck all rows
        handleCheckChange(newCheckedItems);
    };

    const handleSortChange = (sortValue) => {
        setCurrentSort(sortValue); // Store the selected sort value

        let sortedData = [...recycleData];

        switch (sortValue) {
            case 'titleAsc':
                sortedData = sortedData.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'titleDesc':
                sortedData = sortedData.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'private':
                sortedData = sortedData.sort((a, b) => (a.status === 'private' ? -1 : 1));
                break;
            case 'public':
                sortedData = sortedData.sort((a, b) => (a.status === 'public' ? -1 : 1));
                break;
            default:
                break;
        }

        // Apply the search filter if there's an active search term
        if (searchTerm) {
            sortedData = sortedData.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredData(sortedData);
        setCurrentPage(1); // Reset to the first page after sorting
    };

    return (
        <div className="bg-white rounded-t-radiusUi w-full flex flex-col">
            <div className="mx-5 flex-grow flex flex-col">
                <div className="flex flex-col md:flex-row justify-between mt-4">
                    <div className="flex flex-col">
                        <h1 className="text-2xl md:text-3xl font-bold text-blackUi">Trash</h1>
                        <p className="text-xs sm:text-sm font-medium text-blackUi pt-0.5">Save things or waste, it's your choice</p>
                    </div>
                </div>

                <hr className="border-lessBlackUi opacity-25 mt-5"/>

                <div className="flex flex-col md:flex-row md:gap-12 gap-5 md:items-center md:justify-between mt-10 w-full">
                    <div className="flex flex-col md:flex-row gap-5 w-full">
                        <Filter handleSortChange={handleSortChange} />
                        <Search
                            data={recycleData}
                            setFilteredData={setFilteredData}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            currentSort={currentSort}
                        />
                    </div>
                    <div className="flex justify-start lg:justify-end gap-3 w-full xl:w-auto">
                        {(checkedItems.length > 0 && !isAlreadyDeleted) && (
                            <>
                                <DeleteButton
                                    onClick={() => {
                                        setActionType('delete');
                                        setPopupVisible(true);
                                    }}
                                    isHeaderChecked={isHeaderChecked}
                                />
                                <RecycleButton
                                    onClick={() => {
                                        setActionType('recycle');
                                        setPopupVisible(true);
                                    }}
                                    isHeaderChecked={isHeaderChecked}
                                />
                            </>
                        )}
                    </div>
                </div>

                <div className="sm:mt-10 mt-5 flex flex-col">
                    <RecycleBin
                        data={currentRecords}
                        checkedRows={checkedItems}
                        isHeaderChecked={isHeaderChecked}
                        onHeaderCheck={handleHeaderCheck} // Updated header check function
                        onRowCheck={(id) => {
                            const newCheckedItems = checkedItems.includes(id)
                                ? checkedItems.filter(rowId => rowId !== id) // Uncheck if already checked
                                : [...checkedItems, id]; // Add clicked item to checked items
                            handleCheckChange(newCheckedItems); // Only update checked items
                        }}
                        onIconClick={handleIconClick}
                        isAlreadyDeleted={isAlreadyDeleted}
                    />

                    {filteredData.length > 0 && (
                        <div className="text-xs xl:text-sm my-5 text-blackUi flex gap-3 items-center justify-between">
                            <p>
                                Showing {currentRecords.length} of {filteredData.length} records
                            </p>
                            <Pagination
                                totalRecords={filteredData.length}
                                recordsPerPage={recordsPerPage}
                                currentRecords={currentRecords}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </div>
            </div>
            {isPopupVisible && (
                <PopupForm
                    onClose={handleClosePopup}
                    actionType={actionType}
                    onConfirm={handleActionConfirmed}
                />
            )}
        </div>
    );
};

export default TrashPageComponent;
