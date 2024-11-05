import data from "../../../../data/blocknote.json"
import Editor from "./Editor"
import { QuestionRate } from "./QuestionRate"

export const QuestionAnswer = ({ rate }) => {
    return (
        <div className="flex w-full">
            <QuestionRate rate={rate} />
            <div className="w-full">
                <Editor writable={false} data={data?.payload[3].doc} />
                {/* <hr className="mt-6" /> */}
            </div>
        </div>
    )
}