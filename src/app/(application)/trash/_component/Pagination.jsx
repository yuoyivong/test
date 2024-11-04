"use client";

import React, { useState, useEffect } from 'react';

const Pagination = ({ totalRecords, recordsPerPage, currentRecords, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    // Check if current records are empty, if so notify the parent to reset
    useEffect(() => {
        if (currentRecords.length === 0 && currentPage > 1) {
            setCurrentPage(1); // Reset to first page
            onPageChange(1); // Notify parent component
        }
    }, [currentRecords, currentPage, onPageChange]);

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        onPageChange(currentPage); // Notify the parent component about the page change
    }, [currentPage, recordsPerPage, totalRecords, onPageChange]);

    const renderPageNumbers = () => {
        const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

        return pageNumbers.map((page) => (
            <button
                key={page}
                type="button"
                className={`min-h-[30px] min-w-[30px] gap-1 flex justify-center items-center py-1 rounded-lg cursor-pointer
                    ${currentPage === page
                    ? 'bg-blackUi text-white border border-blackUi'
                    : 'text-lessBlackUi border border-lessBlackUi'}`}
                onClick={() => handlePageClick(page)}
            >
                {page}
            </button>
        ));
    };

    return (
        <div className="flex items-center gap-x-1" aria-label="Pagination">
            <button
                type="button"
                className={`min-h-[25px] min-w-[25px] px-2.5 text-xs xl:text-sm font-semibold ${
                    currentPage === 1 ? 'hidden' : 'text-blackUi cursor-pointer'
                }`}
                aria-label="Previous"
                disabled={currentPage === 1}
                onClick={handlePrev}
            >
                Prev
            </button>

            <div className={`flex items-center gap-x-1 text-xs xl:text-sm font-semibold ${totalPages === 1 ? 'hidden' : ''}`}>
                {renderPageNumbers()}
            </div>

            <button
                type="button"
                className={`min-h-[25px] min-w-[25px] px-2.5 text-xs xl:text-sm font-semibold ${
                    currentPage === totalPages ? 'hidden' : 'text-blackUi cursor-pointer'
                }`}
                aria-label="Next"
                disabled={currentPage === totalPages}
                onClick={handleNext}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
