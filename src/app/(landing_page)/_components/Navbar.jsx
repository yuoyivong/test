import Image from "next/image"
import logo from "../../../../public/images/stacknotes-logo.png"
import Link from "next/link"

export const Navbar = () => {
    return (
        <div className="fixed backdrop-blur-sm w-full flex justify-between items-center h-fit py-2 px-2 lg:px-24 z-50">
            <div className="p-2">
                <Link href={'/'}>
                    <Image src={logo} height={69.35} width={210} className="hidden md:block" />
                </Link>
                <Link href={'/'}>
                    <Image src={logo} height={44} width={139} className="md:hidden" />
                </Link>
            </div>
            <div className="flex font-medium items-center h-full space-x-6 text-xs lg:text-sm 2xl:text-base">
                <div className="flex gap-6 items-center">
                    <Link className="text-blackUi hover:text-lessBlackUi duration-300 hidden lg:block" href="#exp">
                        Features
                    </Link>
                    <Link className="text-blackUi hover:text-lessBlackUi duration-300 hidden lg:block" href="#team">
                        About Us
                    </Link>
                </div>
                <div className="w-[2px] h-[20px] bg-lessBlackUi hidden lg:block"></div>
                <div className="flex gap-6 items-center">
                    <Link className="text-blackUi hover:text-lessBlackUi duration-300" href="/register">
                        Sign Up
                    </Link>
                    <Link className="flex justify-center items-center w-[72px] lg:w-[130px] h-[32px] lg:h-[44px] bg-blackUi rounded-2xl text-white text-center" href="/login">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}