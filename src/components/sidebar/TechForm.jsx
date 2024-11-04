import { useState } from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Add } from "iconsax-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import warningIcon from "../../../public/icons/excla.svg";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialogV2";

export const TechForm = ({ handleSetData }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isOpen, setIsOpen] = useState(false);

    const onSubmit = (data) => {
        handleSetData(data.title.trim().replace(/\s+/g, ' '));
        reset();
        setIsOpen(false);
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <TooltipProvider>
                    <Tooltip>
                        <DialogTrigger asChild>
                            <TooltipTrigger asChild>
                                <Add className="cursor-pointer invisible group-hover:visible" size={24} color="#344054" />
                            </TooltipTrigger>
                        </DialogTrigger>
                        <TooltipContent className="bg-blackUi">
                            <p className="text-white">Create New Tech Section</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <DialogContent
                    triggerClose={() => { reset(); setIsOpen(false); }}
                    className="!rounded-3xl max-w-screen !w-[90%] xl:!w-[40%]"
                >
                    <DialogHeader>
                        <DialogTitle className="mb-8 text-blackUi md:text-lg xl:text-xl text-start">
                            Create New Section
                        </DialogTitle>
                        <DialogDescription>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-5">
                                    <Input
                                        {...register('title', {
                                            required: 'This field is required',
                                            pattern: {
                                                value: /^(?=.*\S).+$/,
                                                message: 'Cannot be only spaces',
                                            },
                                        })}
                                        className={`h-12 rounded-xl bg-lessWhiteUi focus-visible:ring-0 ${errors.title ? 'border border-red-500' : ''}`}
                                        placeholder="Enter section title"
                                    />
                                    {errors.title && (
                                        <p className="text-red-500 text-xs lg:text-sm">{errors.title.message}</p>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Image src={warningIcon} height={16} width={16} alt="Warning Icon" />
                                        <p className="text-lessBlackUi text-xs xl:text-base text-start">
                                            This title will be displayed on the sidebar as a new section.
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full flex justify-end">
                                    <Button
                                        type="submit"
                                        className="mt-6 text-xs xl:text-base rounded-xl border-lessBlackUi bg-lessWhiteUi xl:w-[130px] xl:h-[44px] hover:bg-lessWhiteUi"
                                        variant="outline"
                                    >
                                        Create
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
};
