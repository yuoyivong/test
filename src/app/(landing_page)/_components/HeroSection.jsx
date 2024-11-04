'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import note from "../../../../public/images/tick_fig.svg"
import solving from "../../../../public/images/solving.svg"
import { ArrowRight } from 'iconsax-react';
import arrow from "../../../../public/icons/arrow-right.svg"
import { useEffect } from 'react';

export const HeroSection = () => {

    const staggerContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("auth", JSON.stringify(false));
        }
    }, []);

    return (
        <motion.section
            className="px-2 md:px-0 overflow-hidden relative flex flex-col items-center justify-center space-y-6 h-screen bg-[url('/images/patternDamn.jpg')] bg-cover bg-center"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
        >
            <motion.h1
                className="text-blackUi text-4xl lg:text-6xl font-semibold text-center lg:max-w-5xl !leading-[1.15]"
                variants={fadeIn}
            >
                Your space to capture ideas,{' '}
                <span className="relative">
                    ask{' '}
                    <span className="absolute -left-14 xl:left-0 -bottom-3 -rotate-6 py-[4px] px-2 md:px-4 md:py-2 rounded-full bg-blueUi text-white text-xs whitespace-nowrap">
                        How do I center a div?
                    </span>
                </span>{' '}
                questions, and find{' '}
                <span className="relative">
                    answers{' '}
                    <span className="absolute left-1/4 whitespace-nowrap -bottom-4 md:-bottom-3 py-[4px] px-2 md:px-4 md:py-2 rounded-full bg-greenUi text-white text-xs">
                        Status Code 200
                    </span>
                </span>
                —seamlessly.
            </motion.h1>

            <motion.p
                className="text-lessBlackUi text-xs lg:text-base max-w-md text-center"
                variants={fadeIn}
            >
                Our hybrid app combines note-taking and Q&A, letting you capture ideas,
                organize insights, and find answers in one place—boosting productivity
                and learning.
            </motion.p>

            <motion.div
                className="py-4 lg:py-4 px-3 lg:px-4 rounded-full border border-primaryCherUi"
                variants={fadeIn}
            >
                <Link href="/question" className="rounded-full font-medium flex items-center gap-2 px-6 py-3 lg:py-4 bg-blackUi text-white text-xs lg:text-base">
                    Explore with our Q&A Section
                    <ArrowRight className="-rotate-45 lg:hidden" size="18" color="#FFFFFF" />
                    <Image className='hidden lg:block' src={arrow} width={24} height={24} alt='hero-icon' />
                </Link>
            </motion.div>

            <motion.div className="absolute right-28 hidden xl:block" variants={fadeIn}>
                <Image src={note} width={222} height={222} />
            </motion.div>

            <motion.div className="absolute bottom-28 left-28 hidden xl:block" variants={fadeIn}>
                <Image src={solving} width={222} height={222} />
            </motion.div>

            <motion.div
                className="absolute bottom-0 w-full h-[200px] bg-gradient-to-t from-white to-transparent"
                variants={fadeIn}
            />
        </motion.section>
    )
}