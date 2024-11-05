'use client'

import { useEffect, useState } from "react"
import documentsData from "@/data/documents.json";
import { useRouter } from "next/navigation"
import { RandomIcon } from "@/components/alternative/RandomIcon"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AddWorkSpace from "@/components/ui/AddWorkSpace";
import eventBus from "@/app/(application)/notes/_component/eventBus";

export const TabNote = ({ triggerFunc }) => {
    const router = useRouter();
    const [workspaces, setWorkspaces] = useState(documentsData.payload);

    // Handle creating a new workspace
    const handleCreateWorkspace = (workspaceName) => {
        const newWorkspace = {
            id: workspaces.length + 1, // Consider a more robust ID generation method
            workspaceName,
            documents: [], // Ensure this matches your document structure
        };
        // Update the state
        setWorkspaces((prevWorkspaces) => [...prevWorkspaces, newWorkspace]);
        // Optionally, update documentsData if necessary
        documentsData.payload.push(newWorkspace); // This is just for local updates
    };

    // Handle workspace click navigation
    const handleWorkspaceClick = (workspaceId) => {
        router.push(`/notes/workspace/${workspaceId}`);
    };

    // Handle document click navigation
    const handleDocumentClick = (workspaceId, docId) => {
        router.push(`/notes/workspace/${workspaceId}/document/${docId}`);
    };

    // Effect to handle workspace deletion
    useEffect(() => {
        const handleWorkspaceDeleted = () => {
            setWorkspaces(documentsData.payload); // Refresh workspaces data
        };

        eventBus.on('workspaceDeleted', handleWorkspaceDeleted);

        // Cleanup the event listener
        return () => {
            eventBus.events['workspaceDeleted'] = eventBus.events['workspaceDeleted'].filter(
                (callback) => callback !== handleWorkspaceDeleted
            );
        };
    }, []);

    return (
        <>
            <div className="flex items-center p-2 xl:py-3 px-3 hover:bg-primaryCherUi rounded-xl group">
                <h2 className="w-full text-xs xl:text-sm font-medium text-blackUi">WORKSPACE</h2>
                <AddWorkSpace onCreate={handleCreateWorkspace} />
            </div>
            <div className="h-[320px] overflow-y-scroll">
                <Accordion type="single" collapsible>
                    {workspaces.map((workspace) => (
                        <AccordionItem key={workspace.id} value={`item-${workspace.id}`} className="border-none">
                            <AccordionTrigger
                                workspaceId={workspace.id}
                                className="justify-between gap-2 p-2 xl:p-3 rounded-xl hover:bg-primaryCherUi hover:no-underline"
                                onClick={() => handleWorkspaceClick(workspace.id)}
                            >
                                <div onClick={triggerFunc} className="flex items-center gap-2">
                                    <RandomIcon name={workspace.workspaceName} /> {/* Use `name` as workspace property */}
                                    <p className="text-xs xl:text-sm font-normal text-blackUi max-w-32 truncate">{workspace.workspaceName}</p>
                                </div>
                            </AccordionTrigger>
                            {workspace.documents.map((doc) => (
                                <AccordionContent
                                    key={doc.id} // Ensure document IDs are unique
                                    className="ml-4 p-2.5 hover:bg-primaryCherUi rounded-lg cursor-pointer my-1.5"
                                    onClick={() => handleDocumentClick(workspace.id, doc.id)}
                                >
                                    <div onClick={triggerFunc} className="flex items-center gap-2">
                                        {/*<DocumentText size="24" color="#FF8A65"/>*/}
                                        <svg width="18" height="22" viewBox="0 0 18 22" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M1 5C1 2.79086 2.79086 1 5 1H9H11.0633C11.6568 1 12.2197 1.26365 12.5997 1.71963L16.5364 6.44373C16.836 6.80316 17 7.25623 17 7.7241V11V17C17 19.2091 15.2091 21 13 21H5C2.79086 21 1 19.2091 1 17V5Z"
                                                stroke="#FF8A65" stroke-opacity="0.8" stroke-width="1.5" />
                                            <path d="M12 1.5V5C12 6.10457 12.8954 7 14 7H16.5" stroke="#FF8A65"
                                                stroke-opacity="0.8" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M5 11H13" stroke="#FF8A65" stroke-opacity="0.8" stroke-width="1.5"
                                                stroke-linecap="round" />
                                            <path d="M5 16H9" stroke="#FF8A65" stroke-opacity="0.8" stroke-width="1.5"
                                                stroke-linecap="round" />
                                        </svg>

                                        <p className="text-xs xl:text-sm max-w-32 truncate">{doc.title}</p>
                                    </div>
                                </AccordionContent>
                            ))}
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </>
    );
};
