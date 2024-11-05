'use client'

import { PublicPopup } from "@/components/sidebar/PublicPopup"
import { ArrowUp2 } from "iconsax-react"
import { ArrowDown2 } from "iconsax-react"
import { useSession } from "next-auth/react"
import { useState } from "react"

export const QuestionRate = ({ rate }) => {
    const { data: session, status } = useSession()
    const [ok, setOk] = useState(1)
    return (
        <>
            <div className="hidden lg:flex flex-col items-center">
                {status === "authenticated" ?
                    <ArrowUp2 onClick={() => setOk(ok + 1)} className="cursor-pointer" size="32" color="#344054" />
                    :
                    <PublicPopup>
                        <ArrowUp2 className="cursor-pointer" size="32" color="#344054" />
                    </PublicPopup>
                }

                <p>{ok}</p>
                {status === "authenticated" ?
                    <ArrowDown2 onClick={() => setOk(ok - 1)} className="cursor-pointer" size="32" color="#344054" />
                    :
                    <PublicPopup>
                        <ArrowDown2 className="cursor-pointer" size="32" color="#344054" />
                    </PublicPopup>
                }
            </div>
            <div className="lg:hidden flex flex-col items-center">
                {status === "authenticated" ?
                    <ArrowUp2 onClick={() => setOk(ok + 1)} className="cursor-pointer" size="32" color="#344054" />
                    :
                    <PublicPopup>
                        <ArrowUp2 className="cursor-pointer" size="24" color="#344054" />
                    </PublicPopup>
                }

                <p>{ok}</p>
                {status === "authenticated" ?
                    <ArrowDown2 onClick={() => setOk(ok - 1)} className="cursor-pointer" size="32" color="#344054" />
                    :
                    <PublicPopup>
                        <ArrowDown2 className="cursor-pointer" size="24" color="#344054" />
                    </PublicPopup>
                }
            </div>
        </>
    )
}