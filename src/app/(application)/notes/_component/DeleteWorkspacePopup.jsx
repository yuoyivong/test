import React from 'react';
import { Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const DeleteWorkspacePopup = ({ onClose, onConfirm }) => {
    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm(); // Call the onConfirm function passed as a prop
        }
        onClose(); // Call the onClose function passed as a prop
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="!rounded-3xl min-h-80 max-h-[30rem] !w-[20rem] flex flex-col justify-between items-center gap-5">
                <DialogDescription>
                    <div className="flex flex-col items-center justify-center text-center gap-5">
                        <Image src={'/images/delete-image.png'} alt={'delete'} width={200} height={200} />
                        <p className="font-medium xl:text-xl text-blackUi">
                            Are you sure you want to delete this workspace?
                        </p>
                    </div>
                </DialogDescription>

                <div className="flex items-center justify-center gap-3 my-2">
                    <Button onClick={onClose} className="text-sm xl:text-base bg-transparent hover:bg-transparent text-blackUi border rounded-lg xl:rounded-radiusBorder border-lessBlackUi border-opacity-50 px-5 py-2 min-h-11 min-w-32">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        className="text-sm xl:text-base text-white bg-deleteColor rounded-lg xl:rounded-radiusBorder hover:bg-deleteColor px-5 py-2 min-h-11 min-w-32"
                    >
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteWorkspacePopup;
