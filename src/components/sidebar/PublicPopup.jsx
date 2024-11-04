'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { LogoutCurve } from "iconsax-react"
import Image from "next/image"
import noAuth from "../../../public/images/no-auth.svg"
import { Button } from "./../ui/button"
import Link from "next/link"
import { useState } from "react"
import { ArrowRight } from "iconsax-react"

export const PublicPopup = ({ children, className }) => {

    const [isOpen, setIsOpen] = useState(false);

    const closeDialog = () => setIsOpen(false);
    const openDialog = () => setIsOpen(true);

    return (
        <div className={`${className}`}>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    {children ?
                        <div>
                            {children}
                        </div>
                        :
                        <div className={`cursor-pointer text-blackUi font-medium rounded-lg text-center py-2 w-full`}>
                            <p className="text-xs lg:text-base font-medium">Note</p>
                        </div>
                    }
                </DialogTrigger>
                <DialogContent className="max-w-screen !w-[320px] !h-[400px] !rounded-3xl">
                    <DialogHeader className="flex flex-col justify-between">
                        <DialogDescription className="flex flex-col justify-between mx-auto text-center space-y-4 mt-8">
                            <div className="">
                                <Image src={noAuth} width={150} height={150} className="mx-auto" />
                            </div>
                            <div className="text-xl text-blackUi">
                                You have no permission to do this action
                            </div>
                            <div className="flex gap-4 w-full">
                                <Link href={"/login"} className="w-full">
                                    <Button className="text-white h-11 w-full bg-blackUi mt-6 text-xs xl:text-base rounded-xl border focus-visible:ring-0 focus:right-0 ring-0 hover:bg-blackUi">
                                        <p className="font-normal !text-white">Please sign in first</p>
                                        <ArrowRight size="18" color="#ffffff" />
                                    </Button>
                                </Link>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div >
    )
}