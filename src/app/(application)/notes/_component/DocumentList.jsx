"use client";

import React, {useState, useEffect, useRef} from "react";
import {Global, Lock1, TableDocument} from "iconsax-react";
import SortBy from "@/app/(application)/notes/_component/SortBy";
import DocumentMore from "@/app/(application)/notes/_component/DocumentMore";
import Link from "next/link";
import Image from "next/image";

const DocumentList = ({workspaceId, initialDocuments, allDocuments}) => {
    const [documents, setDocuments] = useState(initialDocuments); // Load first 10
    const [loading, setLoading] = useState(false); // Track loading state
    const [hasMore, setHasMore] = useState(allDocuments.length > 10); // Flag to indicate if there are more documents to load
    const [sortBy, setSortBy] = useState("oldest"); // Sorting state
    const loader = useRef(null);

    // Handle sorting of documents
    useEffect(() => {
        const sortedDocuments = [...allDocuments].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            if (sortBy === "newest") {
                return dateB - dateA;
            } else {
                return dateA - dateB;
            }
        });

        setDocuments(sortedDocuments.slice(0, 10)); // Reset to first 10 sorted documents
        setHasMore(sortedDocuments.length > 10); // Check if there are more than 10 documents
    }, [sortBy, allDocuments]);

    // Load more documents when the user scrolls near the bottom
    const loadMoreDocuments = () => {
        setLoading(true);
        const currentCount = documents.length;
        const moreDocuments = allDocuments.slice(currentCount, currentCount + 10);
        setTimeout(() => {
            setDocuments((prev) => [...prev, ...moreDocuments]); // Append new documents
            setHasMore(moreDocuments.length > 0); // Update the flag based on remaining documents
            setLoading(false);
        }, 500);
    };

    // Intersection Observer to track when user scrolls near the bottom
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                loadMoreDocuments();
            }
        });

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, [hasMore, loading]);

    // Update document status and update the state
    const updateDocumentStatus = (docId, newStatus) => {
        setDocuments((prevDocuments) =>
            prevDocuments.map((doc) =>
                doc.id === docId ? {...doc, status: newStatus} : doc
            )
        );
    };

    // Delete document from the list and update the state
    const deleteDocument = (docId) => {
        setDocuments((prevDocuments) => prevDocuments.filter((doc) => doc.id !== docId));
    };
    return (

        documents.length > 0 ? (
            <div>
                {/* Sort by block */}
                <SortBy setSortBy={setSortBy}/>

                {/* Document Cards */}
                <div className="mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {documents?.map((doc) => (
                            <div key={doc.id}>
                                <DocumentMore
                                    doc={doc}
                                    updateDocumentStatus={updateDocumentStatus}
                                    deleteDocument={deleteDocument}
                                />
                                <div
                                    className="flex flex-col gap-3 p-5 bg-primaryCherUi relative rounded-radiusBorder cursor-pointer transition-all duration-300 transform"
                                >
                                    <Link href={`/notes/workspace/${workspaceId}/document/${doc.id}`}>
                                        <TableDocument size="28" color="#344054"/>
                                        <h2 className="text-lg xl:text-xl font-semibold text-blackUi my-10">
                                            {doc?.title}
                                        </h2>
                                        <div
                                            className="text-xs sm:text-sm font-medium flex items-center justify-between mt-5">
                                            <p className="text-xs sm:text-sm font-medium text-lessBlackUi">
                                                {doc?.date}
                                            </p>
                                            {doc?.status === "private" ? (
                                                <Lock1 size="20" color="#007AFF"/>
                                            ) : (
                                                <Global size="20" color="#17C964"/>
                                            )}
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Loader with spinner */}
                {loading && (
                    <div className="flex justify-center items-center mt-10">
                        <div className="spinner"/>
                    </div>
                )}

                {/* Loader trigger for infinite scroll */}
                {hasMore && !loading && (
                    <div
                        ref={loader}
                        className="flex justify-center items-center mt-10 text-lg font-medium text-gray-600"
                    >
                        Loading more documents...
                    </div>
                )}
            </div>
        ) : (
            <div className={'absolute top-1/3 left-1/2'}>
                <div className="flex justify-center items-center flex-col">
                    <Image
                        src={'/images/no-data.png'}
                        alt={'No Data Available'}
                        width={300}
                        height={300}
                    />
                    <p className={'text-2xl font-semibold text-blackUi'}>No data available</p>
                </div>
            </div>
        )
    )
        ;
};

export default DocumentList;
