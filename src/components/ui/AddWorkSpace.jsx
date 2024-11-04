"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Add } from "iconsax-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddWorkSpace = ({ onCreate }) => {
    const [workspaceName, setWorkspaceName] = useState("");
    const [error, setError] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleCreateWorkspace = () => {
        if (workspaceName.trim()) {
            onCreate(workspaceName);
            setWorkspaceName(""); // Clear input after creation
            setIsDialogOpen(false); // Close dialog after creation
        } else {
            setError("Title is required");
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setWorkspaceName(value);

        // Validate input and set error
        if (value.trim().length < 1) {
            setError("Title is required");
        } else {
            setError("");
        }
    };

    const handleDialogChange = (isOpen) => {
        setIsDialogOpen(isOpen);
        if (!isOpen) {
            // Reset state when the dialog is closed
            setWorkspaceName("");
            setError("");
        }
    };

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
                <TooltipProvider>
                    <Tooltip>
                        <DialogTrigger asChild>
                            <TooltipTrigger asChild>
                                <Add className="cursor-pointer invisible group-hover:visible" size="24" color="#344054" />
                            </TooltipTrigger>
                        </DialogTrigger>
                        <TooltipContent className="bg-blackUi">
                            <p className="text-white">Create New Workspace</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <DialogContent className="!rounded-3xl max-w-screen !w-[90%] xl:!w-[40%]">
                    <DialogHeader>
                        <DialogTitle className="mb-8 text-blackUi md:text-lg xl:text-xl text-start">
                            Create New Workspace
                        </DialogTitle>
                        <DialogDescription>
                            <div className="space-y-5">
                                <Input
                                    value={workspaceName}
                                    onChange={handleInputChange}
                                    className={`rounded-lg xl:rounded-radiusBorder h-12 text-xs sm:text-sm xl:text-base bg-primaryCherUi text-blackUi focus-visible:ring-0 ${error ? "border-red-500" : ""
                                    }`}
                                />
                                {error && (
                                    <p className="text-red-500 text-xs xl:text-base text-start">
                                        {error}
                                    </p>
                                )}
                                <div className="flex gap-1 items-center justify-start">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_6_7889)">
                                            <path
                                                d="M6 0C4.81331 0 3.65328 0.351894 2.66658 1.01118C1.67989 1.67047 0.910851 2.60754 0.456726 3.7039C0.00259972 4.80026 -0.11622 6.00666 0.115291 7.17054C0.346802 8.33443 0.918247 9.40353 1.75736 10.2426C2.59648 11.0818 3.66558 11.6532 4.82946 11.8847C5.99335 12.1162 7.19975 11.9974 8.2961 11.5433C9.39246 11.0892 10.3295 10.3201 10.9888 9.33342C11.6481 8.34673 12 7.18669 12 6C11.9983 4.40923 11.3656 2.88411 10.2407 1.75926C9.1159 0.634414 7.59077 0.00172054 6 0V0ZM6 11C5.0111 11 4.0444 10.7068 3.22215 10.1573C2.39991 9.60794 1.75904 8.82705 1.38061 7.91342C1.00217 6.99979 0.90315 5.99445 1.09608 5.02455C1.289 4.05464 1.76521 3.16373 2.46447 2.46447C3.16373 1.7652 4.05465 1.289 5.02455 1.09607C5.99446 0.903148 6.99979 1.00216 7.91342 1.3806C8.82705 1.75904 9.60794 2.3999 10.1574 3.22215C10.7068 4.04439 11 5.01109 11 6C10.9985 7.32564 10.4713 8.59656 9.53393 9.53393C8.59656 10.4713 7.32564 10.9985 6 11Z"
                                                fill="#98A2B3" />
                                            <path
                                                d="M6 2.5C5.86739 2.5 5.74022 2.55268 5.64645 2.64645C5.55268 2.74021 5.5 2.86739 5.5 3V7C5.5 7.13261 5.55268 7.25979 5.64645 7.35355C5.74022 7.44732 5.86739 7.5 6 7.5C6.13261 7.5 6.25979 7.44732 6.35356 7.35355C6.44733 7.25979 6.50001 7.13261 6.50001 7V3C6.50001 2.86739 6.44733 2.74021 6.35356 2.64645C6.25979 2.55268 6.13261 2.5 6 2.5Z"
                                                fill="#98A2B3" />
                                            <path
                                                d="M6.50001 9C6.50001 8.72386 6.27615 8.5 6 8.5C5.72386 8.5 5.5 8.72386 5.5 9C5.5 9.27615 5.72386 9.50001 6 9.50001C6.27615 9.50001 6.50001 9.27615 6.50001 9Z"
                                                fill="#98A2B3" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_6_7889">
                                                <rect width="12" height="12" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    <p className="text-lessBlackUi text-xs xl:text-base text-start">
                                        This title will be displayed on the sidebar as a new workspace
                                    </p>
                                </div>
                            </div>
                            <div className="w-full flex justify-end">
                                <Button
                                    className="bg-blackUi text-white mt-6 text-xs xl:text-base rounded-xl xl:w-[130px] xl:h-[44px] hover:bg-blackUi hover:text-white"
                                    variant="outline"
                                    onClick={handleCreateWorkspace}
                                >
                                    Create
                                </Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddWorkSpace;