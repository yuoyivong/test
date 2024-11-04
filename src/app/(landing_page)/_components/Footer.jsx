import { Google } from "iconsax-react"
import { Facebook } from "iconsax-react"
import Link from "next/link"

export const Footer = () => {
    return (
        <div className="space-y-8 container py-16">
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-blackUi">StackNotes</h2>
                <p className="text-xs lg:text-sm max-w-96 text-lessBlackUi">StackNotes to captures ideas, ask questions, and find answers—seamlessly and effortlessly, helping you stay organized and inspired.</p>
            </div>
            <hr className="border-lessBlackUi" />
            <div className="flex justify-between items-center">
                <p className="text-sm lg:text-base text-blackUi">@Copyright 2024 StackNotes</p>
                <div className="flex items-center gap-4">
                    <Link target="_blank" href={"https://www.facebook.com/ksignhrd"} className="p-1 rounded-full border border-blackUi">
                        <Facebook size="20" color="#344054" variant="Bold" />
                    </Link>
                    <Link href={"mailto:info.kshrd@gmail.com"} className="p-1 rounded-full border border-blackUi">
                        <Google size="20" color="#344054" variant="Bold" />
                    </Link>
                </div>
            </div>
        </div>
    )
}