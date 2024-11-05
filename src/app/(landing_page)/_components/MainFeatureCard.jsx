import Image from "next/image"
import note from "../../../../public/images/note-sec.jpg"
import qna from "../../../../public/images/qna-sec.jpg"

export const MainFeatureCard = ({ title, paragraph, className }) => {
    return (
        <div className={`border-[5px] flex flex-col justify-between space-y-10 border-gentleBlueUi rounded-3xl p-6 ${className}`}>
            <div className="space-y-4">
                <h2 className="text-xl lg:text-2xl font-semibold text-blackUi">{title}</h2>
                <p className="text-xs lg:text-sm text-lessBlackUi">{paragraph}</p>
            </div>
            {title == "Note Taking" ?
                <div className="border-[5px] border-gentleBlueUi rounded-3xl py-16 bg-[url('/images/dot-pattern.jpeg')] bg-cover bg-center">
                    <Image height={284.45} width={440} src={note} className="rounded-2xl border-[5px] border-[#D1D1D1/10] mx-auto hidden md:block lg:block" />
                    <Image height={193.36} width={300} src={note} className="rounded-2xl border-[5px] border-[#D1D1D1/10] mx-auto hidden  lg:hidden" />
                    <Image height={181.275} width={281.25} src={note} className="rounded-2xl border-[5px] border-[#D1D1D1/10] mx-auto md:hidden" />
                </div>
                :
                <div className="border-[5px] border-gentleBlueUi rounded-3xl py-16 bg-[url('/images/dot-pattern.jpeg')] bg-cover bg-center">
                    <Image height={284.45} width={440} src={qna} className="rounded-2xl border-[5px] border-[#D1D1D1/10] mx-auto hidden md:block lg:block" />
                    <Image height={193.36} width={300} src={qna} className="rounded-2xl border-[5px] border-[#D1D1D1/10] mx-auto hidden lg:hidden" />
                    <Image height={181.275} width={281.25} src={qna} className="rounded-2xl border-[5px] border-[#D1D1D1/10] mx-auto md:hidden" />
                </div>}
        </div>
    )
}