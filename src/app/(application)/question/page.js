import Link from "next/link"
import QuestionCard from "./_components/QuestionCard"
import data from "@/data/blocknote.json"

const Page = () => {
    return (
        <div className="my-4 mx-2 md:mx-7">
            <h2 className="text-xl xl:text-3xl text-blackUi font-bold mb-10">All Questions</h2>
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