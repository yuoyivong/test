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
import logout from "../../../public/images/logout-gg.svg"
import { Button } from "./../ui/button"
import Link from "next/link"
import { useState } from "react"

export const LogoutPopup = ({triggerDamn}) => {

    const [isOpen, setIsOpen] = useState(false);

    const closeDialog = () => setIsOpen(false);
    const openDialog = () => setIsOpen(true);

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <div onClick={() => {openDialog; triggerDamn();}} className="p-2 xl:p-3 flex items-center gap-3 hover:bg-primaryCherUi rounded-radiusUi cursor-pointer">
                        <LogoutCurve size="18" color="#344054" />
                        <p>Logout</p>
                    </div>
                </DialogTrigger>
                <DialogContent className="max-w-screen !w-[320px] !h-[400px] !rounded-3xl">
                    <DialogHeader className="flex flex-col justify-between">
                        <DialogDescription className="flex flex-col justify-between mx-auto text-center space-y-8">
                            <div className="">
                                <Image src={logout} width={150} height={150} className="mx-auto" />
                            </div>
                            <div className="text-xl text-blackUi">
                                Are you sure you want to logout?
                            </div>
                            <div className="flex gap-4 w-full">
                                <Button
                                    className="h-[44px] w-1/2 mt-6 text-xs xl:text-base rounded-xl border border-lessBlackUi focus-visible:ring-0 focus:right-0 ring-0 bg-lessWhiteUi hover:bg-lessWhiteUi text-blackUi"
                                    onClick={closeDialog}
                                >
                                    No
                                </Button>
                                <Link href="/" className="w-1/2 h-[44px] bg-blackUi text-white mt-6 text-xs xl:text-base rounded-xl border border-blackUi hover:bg-blackUi hover:text-white flex justify-center items-center">
                                    Yes
                                </Link>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div >
    )
}