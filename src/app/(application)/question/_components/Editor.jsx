'use client'

import { BlockNoteView } from "@blocknote/mantine"
import { DragHandleMenu, getDefaultReactSlashMenuItems, RemoveBlockItem, SideMenu, SideMenuController, SuggestionMenuController, useCreateBlockNote } from "@blocknote/react"
import "@blocknote/mantine/style.css";
import "../style/module.css"
import { BlockNoteSchema, defaultBlockSpecs, filterSuggestionItems } from "@blocknote/core";
import { CodeBlock, insertCode } from "@/components/alternative/Codeblock";
import { insertLine, Lineblock } from "@/components/alternative/LineBlock";

const schema = BlockNoteSchema.create({
    blockSpecs: {
        ...defaultBlockSpecs,
        procode: CodeBlock,
        line: Lineblock,
        audio: undefined,
        video: undefined,
        file: undefined
    },
});

const uploadFile = async (file) => {
    const body = new FormData();
    body.append("file", file);
    const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
        method: "POST",
        body: body,
    });
    return (await ret.json()).data.url.replace(
        "tmpfiles.org/",
        "tmpfiles.org/dl/"
    );
};

const Editor = ({ data, writable }) => {
    const editor = useCreateBlockNote({
        initialContent: data,
        uploadFile,
        schema
    });

    return (
        <BlockNoteView data-changing-font-demo className="w-full min-h-64 xl:min-h-96 !p-0" editor={editor} editable={writable} theme={'light'} slashMenu={false} sideMenu={false}>
            <SideMenuController
                sideMenu={(props) => (
                    <SideMenu
                        {...props}
                        dragHandleMenu={(props) => (
                            <>
                                {/* <RemoveButton /> */}
                                <DragHandleMenu {...props}>
                                    <RemoveBlockItem {...props}>Delete</RemoveBlockItem>
                                </DragHandleMenu>
                            </>
                        )}
                    />
                )}
            />
            <SuggestionMenuController
                triggerCharacter={"/"}
                getItems={async (query) =>
                    filterSuggestionItems(
                        [...getDefaultReactSlashMenuItems(editor), insertCode(editor), insertLine(editor)],
                        query
                    )
                }
            />
        </BlockNoteView>
    )
}

export default Editor