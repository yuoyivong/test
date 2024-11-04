'use client'

import { ArrowUp2 } from "iconsax-react"
import { ArrowDown2 } from "iconsax-react"
import {useState} from "react"

export const QuestionRate = ({ rate }) => {
    const [ok, setOk] = useState(1)
    return (
        <>
            <div className="hidden lg:flex flex-col items-center">
                <ArrowUp2 onClick={() => setOk(ok + 1)} className="cursor-pointer" size="32" color="#344054" />
                <p>{ok}</p>
                <ArrowDown2 onClick={() => setOk(ok - 1)} className="cursor-pointer" size="32" color="#344054" />
            </div>
            <div className="lg:hidden flex flex-col items-center">
                <ArrowUp2 onClick={() => setOk(ok + 1)} className="cursor-pointer" size="24" color="#344054" />
                <p>{ok}</p>
                <ArrowDown2 onClick={() => setOk(ok - 1)} className="cursor-pointer" size="24" color="#344054" />
            </div>
        </>
    )
}