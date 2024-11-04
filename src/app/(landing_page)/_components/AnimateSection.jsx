'use client'

import { motion } from 'framer-motion';
import { SectionTitle } from './SectionTitle';
import { FeatureCard } from './FeatureCard';
import { MainFeatureCard } from './MainFeatureCard';
import { TeamProfile } from './TeamProfile';
import teamData from "@/data/team.json"
import feature from "@/data/features.json"

export const AnimateSection = () => {

    const fadeUpAnimation = {
        hidden: { opacity: 0, y: 250 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: .3 } },
    };

    const fadeInAnimation = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1, delay: 0.2 } },
    };

    const staggerAnimation = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const childAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <div className='space-y-[200px]'>
            {/* <p className='mb-32 h-32 w-8 invisible'></p> */}
            <motion.section
                className="container scroll-mt-24"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                id='exp'
            >
                <motion.div variants={fadeInAnimation}>
                    <SectionTitle
                        title={"Experience the power of seamless functionality"}
                        paragraph={"StackNotes streamlines Q&A and document management with an intuitive design, offering flexible tools for solo or team productivity."}
                    />
                </motion.div>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 mt-24 group"
                    variants={fadeInAnimation}
                >
                    {feature?.payload?.map((x, i) => (
                        <motion.div key={i} variants={fadeInAnimation}>
                            <FeatureCard
                                className="h-full cursor-default relative transition-opacity duration-300 group-hover:opacity-25 hover:!opacity-100"
                                icon={i + 1}
                                title={x?.title}
                                paragraph={x?.description}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>
            <motion.section
                className="container"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <motion.div variants={fadeUpAnimation}>
                    <SectionTitle
                        title={"Our Features"}
                        paragraph={"StackNotes streamlines task management with an intuitive design, offering flexible tools for solo or team productivity."}
                    />
                </motion.div>
                <motion.div
                    className="grid grid-cols-1 2xl:grid-cols-2 gap-8 w-full mt-16"
                    variants={fadeUpAnimation}
                >
                    <MainFeatureCard
                        title={"Note Taking"}
                        paragraph={"StackNote enables efficient note-taking with a flexible interface, allowing users to easily create, organize, and access notes for better task and project management."}
                    />
                    <MainFeatureCard
                        title={"Question And Answers"}
                        paragraph={"StackNotes Q&A feature enables users to ask questions and get quick responses, fostering collaboration and clear communication, while keeping important discussions organized and accessible."}
                    />
                </motion.div>
            </motion.section>
            <section className="container scroll-mt-24" id='team'>
                <SectionTitle
                    title={"About Us"}
                    paragraph={"Created by SR students with expert mentors, our Hybrid System simplifies managing our daily task like note, question. Users read answers to questions without an account, while auth users can create questions and take their notes."}
                />
                <div className="flex flex-col xl:flex-row gap-8 w-full mt-24">
                    <h2 className="text-xl text-blackUi w-3/4 lg:w-1/2">Hi, We are StackNotes’s team! Nice to meet you : )</h2>
                    <p className="text-xs lg:text-base text-lessBlackUi xl:w-1/2">
                        We are a team of young and talented software engineers shaping the future of note-taking and Q&A forums. Through our skills and innovative ideas, we are streamlining workflows and enhancing user experiences, making it easier for individuals and teams to capture, organize, and share knowledge seamlessly.
                    </p>
                </div>
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 py-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerAnimation}
                >
                    {teamData?.payload.map((x, i) => (
                        <motion.div key={i} variants={childAnimation}>
                            <TeamProfile name={x?.name} />
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </div>
    )
}