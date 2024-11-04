'use client'

import Link from "next/link"
import { User } from "iconsax-react"
import { Trash } from "iconsax-react"
import { LogoutPopup } from "../LogoutPopup"
import { PassPopup } from "../PassPopup"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"

export const Setting = ({ triggerFunc, workTab }) => {

    const [auth, setAuth] = useState();

    useEffect(() => {
        const gg = JSON.parse(localStorage.getItem("auth"));
        setAuth(gg);
    }, [])

    if (!auth) return null;

    return (
        <div className="space-y-6">
            <hr />
            <div className="text-xs xl:text-sm font-medium w-full text-blackUi" id="tooltip-select-3">
                <h3 className="uppercase mb-3">Settings</h3>
                <Link href="/user-profile" className="w-full">
                    <div onClick={() => triggerFunc()} className="p-2 xl:p-3 w-full flex items-center gap-3 hover:bg-primaryCherUi rounded-radiusUi cursor-pointer">
                        <User size="18" color="#344054" />
                        <p>User Profile</p>
                    </div>
                </Link>
                <PassPopup triggerDamn={triggerFunc} />
                {workTab == 'note' && <Link href={"/trash"}>
                    <div onClick={() => triggerFunc()} className="p-2 xl:p-3 flex items-center gap-3 hover:bg-primaryCherUi rounded-radiusUi cursor-pointer">
                        <Trash size="18" color="#344054" />
                        <p>Trash</p>
                    </div>
                </Link>}
                <LogoutPopup triggerDamn={triggerFunc} />
            </div>
            <Link href="/user-profile">
                <div className="p-2 bg-primaryCherUi rounded-2xl mt-3">
                    <div className="bg-white p-2 rounded-xl flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-xs font-semibold text-blackUi">Rabinarayan Patra</h3>
                            <p className="text-xs text-lessBlackUi">rabinarayn@yahoo.com</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}