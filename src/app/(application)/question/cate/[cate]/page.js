'use client'

import Link from "next/link";
import data from "@/data/blocknote.json"
import QuestionCard from "../../_components/QuestionCard";
import dataSide from "@/data/sidebar.json"
import { Button } from "@/components/ui/button";
import { PublicPopup } from "@/components/sidebar/PublicPopup";
import { useEffect, useState } from "react";

const Page = ({ params }) => {

    const [auth, setAuth] = useState();

    useEffect(() => {
        const gg = JSON.parse(localStorage.getItem("auth"));
        setAuth(gg);
    }, [])

    return (
        <div className="my-4 mx-2 md:mx-7">
            <div className="flex justify-between !items-center mb-10">
                <h2 className="text-xl xl:text-3xl text-blackUi font-bold">
                    {dataSide?.payload[params?.cate - 1]?.tech ? dataSide?.payload[params?.cate - 1]?.tech : 'No Title'}
                </h2>
                {auth ?
                    <Link href={`/question/ask/${params.cate}`}>
                        <Button className="text-blackUi text-xs xl:text-base rounded-xl border-lessBlackUi bg-lessWhiteUi xl:h-11 hover:bg-lessWhiteUi" variant="outline">Ask Question</Button>
                    </Link>
                    :
                    <PublicPopup>
                        <Button className="text-blackUi text-xs xl:text-base rounded-xl border-lessBlackUi bg-lessWhiteUi xl:h-11 hover:bg-lessWhiteUi" variant="outline">Ask Question</Button>
                    </PublicPopup>
                }
            </div>
            <div className="space-y-3">
                {data?.payload?.map((x, i) => {
                    let docTitle = x?.doc?.filter(x => x?.type == "heading")?.map(heading => heading?.content[0]?.content[0].text);
                    let docDescription = x?.doc?.filter(x => x?.type == "paragraph")?.map(x => x?.content[0]?.text);
                    return (
                        <Link href={`/question/${i + 1}`}>
                            <QuestionCard
                                className="mb-3"
                                title={docTitle}
                                description={docDescription}
                                user={x.user}
                            />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Page