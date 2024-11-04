import { createReactBlockSpec } from "@blocknote/react";
import { insertOrUpdateBlock } from "@blocknote/core";
import { RxDividerHorizontal } from "react-icons/rx";
import "../../app/(application)/question/style/module.css";

const TYPE = "line";

export const Lineblock = createReactBlockSpec(
    {
        type: TYPE,
        propSchema: {
            data: {
                language: "javascript",
                code: "",
            },
        },
        content: "none",
    },
    {
        render: () => {
            return (
                <div className="w-full">
                    <hr />
                </div>
            );
        },
        toExternalHTML: ({ block }) => {
            return (
                <pre className="block-code">
                    <code>{block?.props?.data.code}</code>
                </pre>
            );
        },
    }
);

export const insertLine = () => ({
    title: "Line",
    group: "Other",
    onItemClick: (editor) => {
        insertOrUpdateBlock(editor, {
            type: TYPE,
        });
    },
    aliases: ["line"],
    icon: <RxDividerHorizontal />,
    subtext: "Divider for block",
});
