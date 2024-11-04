import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Message2 } from "iconsax-react"
import { Nunito } from "next/font/google";
const nunito = Nunito({ subsets: ["latin"] });

const QuestionCard = ({className, title, description, user}) => {
    return (
        <>
            <div className={`p-6 space-y-4 border-[3.5px] border-lessWhiteUi hover:border-slate-300/50 bg-white duration-300 rounded-3xl ${className}`}>
                <h2 className={`text-blackUi text-base xl:text-xl font-medium line-clamp-1 ${nunito.className}`}>{title != "" ? title : 'No Title'}</h2>
                <hr className="border-lessWhiteUi" />
                <p className={`text-lessBlackUi font-light text-xs xl:text-sm line-clamp-3 ${nunito.className}`}>{description != "" ? description : 'No Description'}</p>
                <hr className="border-lessWhiteUi" />
                {/* overmobile */}
                <div className="justify-between hidden md:flex">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Avatar>
                                <AvatarImage className="object-cover" src={`${user?.image ? user?.image : `https://github.com/shadcn.png`}`} alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p className="text-xs xl:text-sm text-blackUi">{`${user?.name ? user?.name : 'Rabinarayan Patra'}`}</p>
                        </div>
                        <div className="text-xs xl:text-sm text-blackUi">{`${user?.date ? user?.date : '06 Oct 2024'}`}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Message2 size="18" color="#344054" />
                        <span className="text-blackUi text-xs xl:text-base">{`${user.cmt ? user.cmt : '10'}`}</span>
                    </div>
                </div>
                {/* for mobile */}
                <div className="flex justify-between md:hidden">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Avatar>
                                <AvatarImage className="!group-hover:saturate-0" src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p className="text-xs xl:text-sm text-lessBlackUi">Rabinarayan Patra</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-2">
                            <Message2 size="18" color="#344054" />
                            <span className="text-blackUi text-xs xl:text-base">10</span>
                        </div>
                        <div className="text-xs xl:text-sm text-blackUi">06 Oct 2024</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuestionCard