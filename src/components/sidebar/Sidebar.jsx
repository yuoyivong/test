import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../public/images/stacknotes-logo.png";
import { SidebarLeft } from "iconsax-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Setting } from "./sub-sidebar/Setting";
import { TabQna } from "./sub-sidebar/TabQna";
import { TabNote } from "./sub-sidebar/TabNote";
import documentsData from "@/data/documents.json";
import eventBus from "@/app/(application)/notes/_component/eventBus";
import { SwitchGG } from "./SwitchGG";
import { useSession } from "next-auth/react";
import {getAllWorkspaces} from "@/services/notes_services";

export const Sidebar = ({ triggerFunc }) => {
    const { data: session, status} = useSession()

    const pathname = usePathname();

    const router = useRouter();
    const [workspaces, setWorkspaces] = useState([]);
    const [workTab, setWorkTab] = useState(pathname.startsWith('/question') ? 'qna' : 'note');

    const handleSetWorkTab = (data) => setWorkTab(data);

    useEffect(() => {
        const handleWorkspaceDeleted = () => {
            setWorkspaces([...workspaces]);
        };

        eventBus.on('workspaceDeleted', handleWorkspaceDeleted);

        return () => {
            eventBus.events['workspaceDeleted'] = eventBus.events['workspaceDeleted'].filter(
                (callback) => callback !== handleWorkspaceDeleted
            );
        };
    }, []);
    
    useEffect(() => {
        const fetchWorkspaces = async () => {
            const fetchedWorkspaces = await getAllWorkspaces();

            console.log('data ', fetchedWorkspaces)

            // setWorkspaces(fetchedWorkspaces.payload || []);

        };
        fetchWorkspaces()
    })

    const firstWorkspaceId = workspaces.length > 0 && workspaces[0] ? workspaces[0].id : null;

    return (
        <div className="bg-white h-screen w-full flex flex-col justify-between p-6 xl:pb-6 pb-[env(safe-area-inset-bottom)] !z-[2000]">
            <div className="space-y-6 w-full h-full">
                <div className="flex items-center gap-2 justify-between xl:justify-center">
                    {pathname.startsWith('/question') ? (
                        <>
                            <Link href={'/question'}>
                                <Image src={logo} alt="logo" width={210} height={100} priority className="hidden xl:block" />
                            </Link>
                            <Link href={'/question'}>
                                <Image src={logo} alt="logo" width={150} height={75} priority className="xl:hidden" />
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href={workspaces.length === 0 ? "/notes/workspace" : `/notes/workspace/${firstWorkspaceId}`}>
                                <Image src={logo} alt="logo" width={210} height={100} priority className="hidden xl:block" />
                            </Link>
                            <Link href={workspaces.length === 0 ? "/notes/workspace" : `/notes/workspace/${firstWorkspaceId}`}>
                                <Image src={logo} alt="logo" width={150} height={75} priority className="xl:hidden" />
                            </Link>
                        </>
                    )}
                    <SidebarLeft onClick={() => triggerFunc()} className="cursor-pointer xl:hidden" size="24" color="#98a2b3" />
                </div>
                <SwitchGG workTab={workTab} workspaces={workspaces} firstWorkspaceId={firstWorkspaceId} handleSetWorkTab={handleSetWorkTab} />
                {workTab !== 'qna' ? <TabNote triggerFunc={triggerFunc} /> : <TabQna triggerFunc={triggerFunc} />}
            </div>
            <Setting workTab={workTab} triggerFunc={triggerFunc} />
        </div>
    );
};