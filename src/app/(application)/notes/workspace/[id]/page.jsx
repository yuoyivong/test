"use client";

import React from "react";
import documentsData from "@/data/documents.json";
import WorkspaceMore from "@/app/(application)/notes/_component/WorkspaceMore";
import DocumentList from "@/app/(application)/notes/_component/DocumentList";
import { useRouter } from "next/navigation";
import eventBus from "@/app/(application)/notes/_component/eventBus";

const Page = ({ params: { id } }) => {
    const router = useRouter();
    const docs = documentsData.payload.find(workspace => workspace.id === parseInt(id));
    const initialDocuments = docs ? docs.documents.slice(0, 10) : []; // First 10 documents
    const allDocuments = docs ? docs.documents : [];

    const deleteWorkspace = (workspaceId) => {
        // Filter out the workspace to delete
        const updatedWorkspaces = documentsData.payload.filter((workspace) => workspace.id !== workspaceId);

        // Update the payload after deletion
        documentsData.payload = updatedWorkspaces;

        // Emit an event to notify TabUi to refresh its state
        eventBus.emit('workspaceDeleted');

        // If there are remaining workspaces, navigate to the last one
        if (updatedWorkspaces.length > 0) {
            const lastWorkspaceId = updatedWorkspaces[updatedWorkspaces.length - 1].id;

            router.push(`/notes/workspace/${lastWorkspaceId}`);
        } else {
            // If no workspaces are left, navigate to the default workspace
            router.push("/notes/workspace");
        }
    };

    return (
        <div className={"my-10 mx-4 md:mx-14"}>
            {/* Top Header */}

            <div className="flex flex-row justify-between items-center gap-4">
                <div className="flex flex-col justify-center items-start gap-2">
                    <h1 className="text-blackUi font-semibold text-2xl md:text-3xl">{docs?.workspaceName}</h1>
                    <p className="text-xs font-medium sm:text-sm">Created By Johnny Dang</p>
                </div>

                <WorkspaceMore workspace={docs} deleteWorkspace={() => deleteWorkspace(docs.id)} />
            </div>

            {/* Document List (Client Component) */}
            <DocumentList workspaceId={id} initialDocuments={initialDocuments} allDocuments={allDocuments} />
        </div>
    );
};

export default Page;
