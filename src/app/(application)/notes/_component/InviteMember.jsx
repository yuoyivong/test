import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SearchNormal } from "iconsax-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import userInfo from "@/data/users.json";

const InviteMember = ({ onClose }) => {
    const initialUsers = userInfo?.users; // Original user list
    const [users, setUsers] = useState(initialUsers); // State to manage users

    // Function to handle user removal
    const handleRemoveUser = (userId) => {
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId)); // Update user list
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="!rounded-3xl min-h-[30rem] max-h-[30rem] !w-[90%] xl:!w-[40%]">
                <DialogHeader>
                    <DialogTitle className="mb-8 text-blackUi md:text-lg xl:text-xl text-start">
                        Invite Member
                        <hr className={'mt-5'} />
                    </DialogTitle>

                    <DialogDescription>
                        <div className="flex items-center justify-between gap-3 xl:gap-4">
                            <div className="relative w-full">
                                <SearchNormal
                                    size="20"
                                    color="#98A2B3"
                                    className="absolute left-5 top-1/2 transform -translate-y-1/2"
                                />
                                <Input
                                    className="w-full border-none rounded-lg xl:rounded-radiusBorder text-xs sm:text-sm xl:text-base h-12 bg-primaryCherUi focus-visible:ring-0 pl-12 text-blackUi"
                                    placeholder="Search"
                                />
                            </div>
                            <Button className={'bg-blackUi py-3 px-7 rounded-xl text-xs sm:text-sm xl:text-base h-12 hover:bg-blackUi'}>
                                Invite
                            </Button>
                        </div>

                        <div className={'mt-5'}>
                            <p className={`text-xs text-blackUi font-medium sm:text-sm xl:text-base text-left ${users?.length > 0 ? '' : 'hidden'}`}>
                                Who has access
                            </p>
                            {/* User list container */}
                            <div className="mt-5 flex flex-col gap-2 overflow-y-scroll no-scrollbar max-h-60">
                                {
                                    users?.map((user) => (
                                        <div key={user?.id} className="bg-primaryCherUi rounded-lg xl:rounded-radiusBorder py-1 xl:py-2">
                                            <div className="flex items-center justify-between mx-5">
                                                <div className="flex items-center justify-center gap-2 xl:gap-3">
                                                    <Image
                                                        src={user?.profile}
                                                        alt={'img'}
                                                        width={24}
                                                        height={24}
                                                        className={'rounded-full object-cover w-8 h-8 lg:w-10 lg:h-10 xl:h-12 xl:w-12'}
                                                        priority
                                                        quality={100}
                                                    />
                                                    <p className={'text-xs font-medium sm:text-sm xl:text-base text-blackUi'}>
                                                        {user?.name}
                                                    </p>
                                                </div>
                                                <button
                                                    className={'text-xs sm:text-sm xl:text-base text-deleteColor font-medium cursor-pointer hover:bg-deleteColor/10 py-1 px-3 rounded-md'}
                                                    onClick={() => handleRemoveUser(user.id)} // Call remove function
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default InviteMember;
