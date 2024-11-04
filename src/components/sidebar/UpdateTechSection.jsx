import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit } from "iconsax-react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import warningIcon from "../../../public/icons/excla.svg";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialogV2";

export const UpdateTechSection = ({ x, name, handleUpdate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const closeDialog = () => setIsOpen(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            titleV2: name,
        },
    });

    const onSubmit = (data) => {
        console.log(data);
        //get cate name
        let oldCate = name;
        //send new cate name to parant
        handleUpdate(oldCate, data.titleV2.trim().replace(/\s+/g, ' '))
        reset();
        closeDialog();
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <Edit
                    size="20"
                    color="#344054"
                    className={`${x?.tech !== "Home" ? 'block' : '!hidden'} hidden group-hover:block`}
                />
            </DialogTrigger>
            <DialogContent
                triggerClose={reset}
                className="!rounded-3xl max-w-screen !w-[90%] xl:!w-[40%]"
            >
                <DialogHeader>
                    <DialogTitle className="mb-8 text-blackUi md:text-lg xl:text-xl text-start">
                        Update Section Name
                    </DialogTitle>
                    <input className="h-0 w-0" type="text" />
                    <DialogDescription>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-5">
                                <Input
                                    {...register('titleV2', {
                                        required: 'This field is required',
                                        pattern: {
                                            value: /^(?=.*\S).+$/,
                                            message: 'Cannot be only spaces',
                                        },
                                    })}
                                    className={`rounded-xl bg-lessWhiteUi focus-visible:ring-0 h-12 ${errors.titleV2 && 'border border-red-500'
                                        }`}
                                />
                                {errors.titleV2 && (
                                    <p className="text-red-500 text-xs lg:text-sm">
                                        {errors.titleV2.message}
                                    </p>
                                )}
                                <div className="flex gap-2">
                                    <Image
                                        src={warningIcon}
                                        height={16}
                                        width={16}
                                        alt="Warning Icon"
                                    />
                                    <p className="text-lessBlackUi text-xs xl:text-base text-start">
                                        This title will be displayed on the sidebar as a new section
                                    </p>
                                </div>
                            </div>
                            <div className="w-full flex justify-end">
                                <Button
                                    type="submit"
                                    className="mt-6 text-xs xl:text-base rounded-xl border-lessBlackUi bg-lessWhiteUi xl:w-[130px] xl:h-[44px] hover:bg-lessWhiteUi"
                                    variant="outline"
                                >
                                    Update
                                </Button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
