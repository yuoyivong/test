import Link from "next/link"
import { PublicPopup } from "./PublicPopup";
import { useSession } from "next-auth/react";

export const SwitchGG = ({ workTab, workspaces, firstWorkspaceId, handleSetWorkTab }) => {
    const { data: session, status} = useSession()

    return (
        <div className="w-full flex bg-primaryCherUi p-1.5 rounded-xl">
            <Link className="w-1/2" href={'/question'}>
                <div onClick={() => handleSetWorkTab('qna')} className={`${workTab === 'qna' && 'bg-white'} cursor-pointer text-blackUi font-medium rounded-lg text-center py-2`}>
                    <p className="text-xs lg:text-base font-medium">Q and A</p>
                </div>
            </Link>
            {status === "authenticated" ?
                <Link
                    className="w-1/2"
                    href={workspaces.length === 0 ? "/notes/workspace" : `/notes/workspace/${firstWorkspaceId}`}
                >
                    <div onClick={() => handleSetWorkTab('note')} className={`${workTab === 'note' && 'bg-white'} cursor-pointer text-blackUi font-medium rounded-lg text-center py-2`}>
                        <p className="text-xs lg:text-base font-medium">Note</p>
                    </div>
                </Link>
                :
                <PublicPopup className={'w-1/2'} />
            }
        </div>
    )
}