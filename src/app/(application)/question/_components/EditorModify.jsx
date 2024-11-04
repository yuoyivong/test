"use client";

import { forwardRef, useImperativeHandle } from "react";
import { BlockNoteView } from "@blocknote/shadcn";
import {
  DragHandleMenu,
  getDefaultReactSlashMenuItems,
  RemoveBlockItem,
  SideMenu,
  SideMenuController,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import "@blocknote/shadcn/style.css";
import "../style/module.css";
import {
  BlockNoteSchema,
  defaultBlockSpecs,
  filterSuggestionItems,
} from "@blocknote/core";
import { insertLine, Lineblock } from "@/components/alternative/LineBlock";
import { CodeBlock2, insertCode } from "@/components/alternative/Codeblock2";

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    procode: CodeBlock2,
    line: Lineblock,
    audio: undefined,
    video: undefined,
    file: undefined,
  },
});

const uploadFile = async (file) => {
  const body = new FormData();
  body.append("file", file);
  const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
    method: "POST",
    body: body,
  });
  return (await ret.json()).data.url.replace("tmpfiles.org/", "tmpfiles.org/dl/");
};

const EditorModify = forwardRef(({ data, writable, handleSaveData }, ref) => {
  const editor = useCreateBlockNote({
    initialContent: data,
    uploadFile,
    schema,
  });

  const handleChange = (data) => handleSaveData(data.document);

  const emptyBlock = [
    {
      id: "unique-id",
      type: "paragraph",
      props: {
        textColor: "default",
        backgroundColor: "default",
        textAlignment: "left",
      },
      content: [],
      children: [],
    },
  ];

  const handleClear = () => {
    editor.replaceBlocks(editor?.topLevelBlocks, emptyBlock);
  };

  useImperativeHandle(ref, () => ({
    handleClear,
  }));

  return (
    <>
      <BlockNoteView
        onChange={(e) => handleChange(e)}
        data-changing-font-demo
        className="w-full min-h-64 xl:min-h-96 !p-0"
        editor={editor}
        editable={writable}
        theme={"light"}
        slashMenu={false}
        sideMenu={false}
      >
        <SideMenuController
          sideMenu={(props) => (
            <SideMenu
              {...props}
              dragHandleMenu={(props) => (
                <>
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
              [
                ...getDefaultReactSlashMenuItems(editor),
                insertCode(editor),
                insertLine(editor),
              ],
              query
            )
          }
        />
      </BlockNoteView>
    </>
  );
});

export default EditorModify;
