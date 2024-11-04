'use client'

import { ShieldSearch } from "iconsax-react"
import { TickCircle } from "iconsax-react"
import { PasswordCheck } from "iconsax-react"
import { Sms } from "iconsax-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const StepperDamnV2 = ({ className }) => {
    const pathname = usePathname();
    const router = useRouter()
    const [step, setStep] = useState(1);

    useEffect(() => {
        const steps = {
            '/forgot-password': 1,
            '/otp-forgot-password': 2,
            '/new-password': 3,
            '/verify-success': 4
        };
        setStep(steps[pathname] || 1);
    }, [pathname]);

    return (
        <>
            <div className={`relative w-full flex justify-between items-center ${className}`}>
                <div className={`${step == 1 ? 'w-0/12' : step == 2 ? 'w-4/12' : step == 3 ? 'w-8/12' : step == 4 ? 'w-full' : 'w-0/12'} h-[2px] bg-lessBlackUi flex justify-between items-center relative`}></div>
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-[2px] bg-black/5 flex justify-between items-center">
                    <Link href={'/forgot-password'}>
                        <div className="cursor-pointer bg-lessWhiteUi p-2 rounded-full z-50 relative flex items-center justify-center">
                            <p className="text-xs lg:text-sm absolute top-0 transform -translate-y-[1.5rem] whitespace-nowrap">Enter Email</p>
                            <Sms size="24" color="#344054" variant="Bulk" />
                        </div>
                    </Link>
                    <Link href={'/otp-forgot-password'}>
                        <div className={`${step == 2 || step == 3 || step == 4 ? 'bg-lessWhiteUi' : 'bg-[#FDFDFE]'} cursor-pointer p-2 rounded-full z-50 relative flex items-center justify-center`}>
                            <p className={`text-xs lg:text-sm ${step == 2 || step == 3 || step == 4 ? 'text-blackUi' : 'text-[#E9EBED]'}  absolute top-0 transform -translate-y-[1.5rem] whitespace-nowrap`}>Verify Otp</p>
                            <ShieldSearch size="24" color={`${step == 2 || step == 3 || step == 4 ? '#344054' : '#E9EBED'}`} variant="Bulk" />
                        </div>
                    </Link>
                    <Link href={'/new-password'}>
                        <div className={`${step == 3 || step == 4 ? 'bg-lessWhiteUi' : 'bg-[#FDFDFE]'} cursor-pointer p-2 rounded-full z-50 relative flex items-center justify-center`}>
                            <p className={`text-xs lg:text-sm ${step == 3 || step == 4 ? 'text-blackUi' : 'text-[#E9EBED]'} absolute top-0 transform -translate-y-[1.5rem] whitespace-nowrap`}>New Password</p>
                            <PasswordCheck size="24" color={`${step == 3 || step == 4 ? '#344054' : '#E9EBED'}`} variant="Bulk" />
                        </div>
                    </Link>
                    <Link href={'/verify-success'}>
                        <div onClick={() => router.push('/verify-success')} className={`${step == 4 ? 'bg-lessWhiteUi' : 'bg-[#FDFDFE]'} cursor-pointer p-2 rounded-full z-50 relative flex items-center justify-center`}>
                            <p className={`text-xs lg:text-sm ${step == 4 ? 'text-blackUi' : 'text-[#E9EBED]'} absolute top-0 transform -translate-y-[1.5rem] whitespace-nowrap`}>Success</p>
                            <TickCircle size="24" color={`${step == 4 ? '#344054' : '#E9EBED'}`} variant="Bulk" />
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}