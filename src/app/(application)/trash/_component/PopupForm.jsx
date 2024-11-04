import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const PopupForm = ({ onClose, actionType, onConfirm }) => {
    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm(actionType); // Call the onConfirm function passed as a prop
        }
        onClose(); // Call the onClose function passed as a prop
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="!rounded-3xl min-h-80 max-h-[30rem] !w-[20rem] flex flex-col justify-between items-center gap-5">
                <DialogDescription>
                    <div className="flex flex-col items-center justify-center text-center gap-5">
                        {actionType === 'delete' ? (
                            <Image src={'/images/delete-image.png'} alt={'delete'} width={200} height={200} />
                        ) : (
                            <Image src={'/images/recycle-image.png'} alt={'restore'} width={200} height={200} />
                        )}
                        <p className="font-medium text-base">
                            Are you sure you want to {actionType === 'recycle' ? 'restore' : 'delete'} these record(s)?
                        </p>
                    </div>
                </DialogDescription>

                <div className="flex items-center justify-center gap-3 my-2">
                    <Button onClick={onClose} className="bg-transparent hover:bg-transparent text-blackUi text-sm xl:text-base border border-lessBlackUi border-opacity-50 px-5 py-2 min-h-11 min-w-32 rounded-lg xl:rounded-radiusBorder">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        className={`text-white px-5 py-2 min-h-11 min-w-32 text-sm xl:text-base rounded-lg xl:rounded-radiusBorder ${
                            actionType === 'recycle' ? 'bg-blackUi hover:bg-blackUi' : 'bg-deleteColor hover:bg-deleteColor'
                        }`}
                    >
                        {actionType === 'recycle' ? 'Restore' : 'Delete'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PopupForm;
