import Image from "next/image";
import { ArrowLeft } from "iconsax-react";
import Link from "next/link";

const Page = () => {
    return (
        <main className="h-screen overflow-hidden">
            {/* logo image */}
            <div className="mt-5 sm:px-1">
                <div className="w-40 sm:w-56 md:w-64 lg:w-[330px] md:pl-10 lg:pl-20">
                   <Link href={"/"}>
                        <Image
                            src="/images/stacknotes-logo.png"
                            width={400}
                            height={400}
                            alt="Stacknotes Logo"
                        />
                    </Link>
                </div>
            </div>

            <div className="h-2/3 flex justify-center items-center">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 items-center lg:grid-cols-2 md:px-20 lg:px-40 md:mt-14 lg:mt-16">
                    {/* text 404 not found */}
                    <div className="sm:block hidden">
                        <h1 className="sm:text-3xl md:text-6xl lg:text-8xl font-bold text-blackUi">
                            Oops...
                        </h1>
                        <div className="">
                            <h3 className="mt-5 mb-2 text-3xl md:text-xl font-semibold text-blackUi">
                                Page not found
                            </h3>
                            <p className="text-[17px] md:text-[15px] font-normal text-blackUi">
                                try reload this page or go back to homepage.
                            </p>
                        </div>

                        <div className="mt-16 md:mt-20">
                            <Link
                                href={"/"}
                                className="inline-flex items-center px-8 h-11 text-base gap-2 font-medium text-center text-white bg-blackUi rounded-[12px] hover:bg-gray-800 focus:ring-4 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <ArrowLeft size="19" color="#fdfefe" />
                                homepage
                            </Link>
                        </div>
                    </div>

                    {/* image */}
                    <div>
                        <Image
                            priority
                            src="/images/404-not-found.png"
                            width={490}
                            height={490}
                            alt="not found page image"
                        />
                        {/* responsive sm btn go homepage */}
                        <div className="mt-20 md:hidden lg:hidden ">
                            <div className="justify-center items-center flex">
                                <Link
                                    href={"/"}
                                    className="inline-flex items-center px-8 h-11 gap-2 text-base font-medium text-center text-white bg-blackUi rounded-[12px] hover:bg-gray-800 focus:ring-4 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <ArrowLeft size="19" color="#fdfefe" />
                                    homepage
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Page;
