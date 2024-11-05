'use client'

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import techSideData from "../../data/sidebar.json"
import Image from "next/image"
import { DocumentText } from "iconsax-react"
import Link from "next/link"
import { TechForm } from "../TechForm"
import AddWorkSpace from "../../ui/AddWorkSpace";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import { UpdateTechSection } from "../UpdateTechSection";
import documentsData from "@/data/workspace.json";
import homeIcon from "../../../public/icons/Home.svg"
import { RandomIcon } from "../../alternative/RandomIcon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { LogoutPopup } from "../LogoutPopup";
import { Trash } from "iconsax-react";
import { PassPopup } from "../PassPopup";
import { User } from "iconsax-react";

export const TabUi = ({ triggerDamn }) => {
    const router = useRouter();
    const pathname = usePathname();

    const [workspaces, setWorkspaces] = useState([documentsData.payload[0]]);

    const defaultTab = pathname.startsWith('/notes') ? 'note' : 'qna';

    const handleCreateWorkspace = (name) => {
        const newWorkspace = {
            id: workspaces.length + 1,
            name,
            document: [],
        };
        setWorkspaces((prevWorkspaces) => [...prevWorkspaces, newWorkspace]);
    };

    const handleDocumentClick = (workspaceId, docId) => {
        router.push(`/notes/workspace/${workspaceId}/document/${docId}`);
    };

    const handleWorkspaceClick = (workspaceId) => {
        router.push(`/notes/workspace/${workspaceId}`);
    };

    const [tabState, setTabState] = useState('note');

    return (
        <div className="h-auto">
            <Tabs defaultValue={defaultTab} className="w-full h-full space-y-6">
                <TabsList className="w-full h-auto p-1.5 xl:p-2 rounded-2xl bg-primaryCherUi" id="tooltip-select-0">
                    <Link className="w-full" href={"/question"}>
                        <TabsTrigger onClick={() => setTabState('qna')} className="text-blackUi w-full py-2 xl:py-[10px] font-medium rounded-xl text-xs xl:text-sm" value="qna">
                            Q and A
                        </TabsTrigger>
                    </Link>
                    <Link className="w-full" href={"/notes/workspace/123"}>
                        <TabsTrigger onClick={() => setTabState('note')} className="text-blackUi w-full py-2 xl:py-[10px] font-medium rounded-xl text-xs xl:text-sm" value="note">
                            Note
                        </TabsTrigger>
                    </Link>
                </TabsList>
            </Tabs>
            <div className="h-full">
                <div className="flex items-center p-2 xl:py-3 px-3 hover:bg-primaryCherUi rounded-xl group">
                    <h2 className="w-full text-xs xl:text-sm font-medium text-blackUi">WORKSPACE</h2>
                    <AddWorkSpace onCreate={handleCreateWorkspace} />
                </div>

                <div className="h-full">
                    <Accordion type="single" collapsible>
                        {workspaces?.map((workspace) => (
                            <AccordionItem key={workspace?.id} value={`item-${workspace?.id}`} className="border-none">
                                <AccordionTrigger
                                    className="justify-between gap-2 p-2 xl:p-3 rounded-radiusUi hover:bg-primaryCherUi hover:no-underline"
                                    onClick={() => handleWorkspaceClick(workspace?.id)}
                                    workspaceId={workspace?.id}
                                >
                                    <div onClick={triggerDamn} className="flex items-center gap-2">
                                        <RandomIcon name={workspace?.name} />
                                        <p className="text-xs xl:text-sm font-normal text-blackUi">{workspace?.name}</p>
                                    </div>
                                </AccordionTrigger>
                                {workspace?.document?.map((doc) => (
                                    <AccordionContent
                                        key={doc?.id}
                                        className="ml-4 p-2 hover:bg-primaryCherUi rounded-radiusUi cursor-pointer mt-1"
                                        onClick={() => handleDocumentClick(workspace?.id, doc?.id)}
                                    >
                                        <div onClick={triggerDamn} className="flex items-center gap-2">
                                            <DocumentText size="20" color="#FF8A65" />
                                            <p className="text-xs xl:text-sm">{doc?.doc}</p>
                                        </div>
                                    </AccordionContent>
                                ))}
                            </AccordionItem>
                        ))}
                    </Accordion>
                    <div className="space-y-6">
                        <hr />
                        <div className="text-xs xl:text-sm font-medium w-full text-blackUi" id="tooltip-select-3">
                            <h3 className="uppercase mb-3 ">Settings</h3>
                            <Link href="/user-profile" className="w-full">
                                <div onClick={() => triggerFunc()} className="p-2 xl:p-3 w-full flex items-center gap-3 hover:bg-primaryCherUi rounded-radiusUi cursor-pointer">
                                    <User size="18" color="#344054" />
                                    <p>User Profile</p>
                                </div>
                            </Link>
                            <PassPopup triggerDamn={triggerDamn} />
                            {pathname.startsWith('/notes') && <Link href={"/trash"}>
                                <div onClick={() => triggerFunc()} className="p-2 xl:p-3 flex items-center gap-3 hover:bg-primaryCherUi rounded-radiusUi cursor-pointer">
                                    <Trash size="18" color="#344054" />
                                    <p>Trash</p>
                                </div>
                            </Link>}
                            <LogoutPopup triggerDamn={triggerDamn} />
                        </div>
                        <Link href="/user-profile">
                            <div className="p-2 bg-primaryCherUi rounded-2xl">
                                <div className="bg-white p-2 rounded-xl flex items-center gap-2">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="text-xs font-semibold text-blackUi">Rabinarayan Patra</h3>
                                        <p className="text-xs text-lessBlackUi">rabinarayn@yahoo.com</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            {/* <TabsContent value="qna" id="tooltip-select-1">
                    <div className="flex items-center p-2 xl:py-3 px-3 hover:bg-primaryCherUi rounded-xl group" id="tooltip-select-2">
                        <h2 className="w-full text-xs xl:text-sm font-medium text-blackUi">TECHNOLOGY</h2>
                        <TechForm />
                    </div>
                    <div className="text-xs xl:text-sm">
                        {techSideData.payload.map((x, i) => (
                            <div key={i} className="p-2 xl:p-3 hover:bg-primaryCherUi rounded-radiusUi">
                                <div className="flex items-center justify-between group">
                                    <Link className="w-full" href={`${x?.tech === "Home" ? '/question' : "/question/cate/spring"}`}>
                                        <div onClick={triggerDamn} className="flex items-center gap-2">
                                            <Image src={homeIcon} width={24} height={24} className={`${x?.tech === "Home" ? 'block' : 'hidden'}`} alt="home-icon" />
                                            <RandomIcon name={x?.tech} className={`${x?.tech !== "Home" ? 'block' : 'hidden'}`} />
                                            <p className="text-blackUi">{x?.tech}</p>
                                        </div>
                                    </Link>
                                    <UpdateTechSection name={x?.tech} x={x} />
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="note" className="h-full">
                    <div className="flex items-center p-2 xl:py-3 px-3 hover:bg-primaryCherUi rounded-xl group">
                        <h2 className="w-full text-xs xl:text-sm font-medium text-blackUi">WORKSPACE</h2>
                        <AddWorkSpace onCreate={handleCreateWorkspace} />
                    </div>

                    <Accordion type="single" collapsible>
                        {workspaces?.map((workspace) => (
                            <div className="h-full flex flex-col justify-between">
                                <AccordionItem key={workspace?.id} value={`item-${workspace?.id}`} className="border-none">
                                    <AccordionTrigger
                                        className="justify-between gap-2 p-2 xl:p-3 rounded-radiusUi hover:bg-primaryCherUi hover:no-underline"
                                        onClick={() => handleWorkspaceClick(workspace?.id)}
                                        workspaceId={workspace?.id}
                                    >
                                        <div onClick={triggerDamn} className="flex items-center gap-2">
                                            <RandomIcon name={workspace?.name} />
                                            <p className="text-xs xl:text-sm font-normal text-blackUi">{workspace?.name}</p>
                                        </div>
                                    </AccordionTrigger>
                                    {workspace?.document?.map((doc) => (
                                        <AccordionContent
                                            key={doc?.id}
                                            className="ml-4 p-2 hover:bg-primaryCherUi rounded-radiusUi cursor-pointer mt-1"
                                            onClick={() => handleDocumentClick(workspace?.id, doc?.id)}
                                        >
                                            <div onClick={triggerDamn} className="flex items-center gap-2">
                                                <DocumentText size="20" color="#FF8A65" />
                                                <p className="text-xs xl:text-sm">{doc?.doc}</p>
                                            </div>
                                        </AccordionContent>
                                    ))}
                                </AccordionItem>
                                <div className="space-y-6">
                                    <hr />
                                    <div className="text-xs xl:text-sm font-medium w-full text-blackUi" id="tooltip-select-3">
                                        <h3 className="uppercase mb-3 ">Settings</h3>
                                        <Link href="/user-profile" className="w-full">
                                            <div onClick={() => triggerFunc()} className="p-2 xl:p-3 w-full flex items-center gap-3 hover:bg-primaryCherUi rounded-radiusUi cursor-pointer">
                                                <User size="18" color="#344054" />
                                                <p>User Profile</p>
                                            </div>
                                        </Link>
                                        <PassPopup triggerDamn={triggerDamn} />
                                        {pathname.startsWith('/notes') && <Link href={"/trash"}>
                                            <div onClick={() => triggerFunc()} className="p-2 xl:p-3 flex items-center gap-3 hover:bg-primaryCherUi rounded-radiusUi cursor-pointer">
                                                <Trash size="18" color="#344054" />
                                                <p>Trash</p>
                                            </div>
                                        </Link>}
                                        <LogoutPopup triggerDamn={triggerDamn} />
                                    </div>
                                    <Link href="/user-profile">
                                        <div className="p-2 bg-primaryCherUi rounded-2xl">
                                            <div className="bg-white p-2 rounded-xl flex items-center gap-2">
                                                <Avatar>
                                                    <AvatarImage src="https://github.com/shadcn.png" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h3 className="text-xs font-semibold text-blackUi">Rabinarayan Patra</h3>
                                                    <p className="text-xs text-lessBlackUi">rabinarayn@yahoo.com</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </Accordion>
                </TabsContent> */}
        </div>
    );
};
