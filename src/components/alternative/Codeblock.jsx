import { createReactBlockSpec } from "@blocknote/react";
import { insertOrUpdateBlock } from "@blocknote/core";
import { MdCode } from "react-icons/md";
import ReactCodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import "@/app/(application)/question/style/module.css";
import { useState } from "react";
import "./damn.css";
import { Copy } from "iconsax-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

const TYPE = "procode";

export const CodeBlock = createReactBlockSpec(
  {
    type: TYPE,
    propSchema: {
      data: {
        language: "javascript",
        code: "",
      },
      language: "",
    },
    content: "none",
  },
  {
    render: ({ block, editor }) => {
      const { data } = block?.props;
      const [copied, setCopied] = useState(false);
      const [mode, setMode] = useState(
        block.props.language ? block.props.language : "javascript"
      );

      const handleLanguageChange = (event) => setMode(event.target.value);

      const onInputChange = (val) => {
        editor.updateBlock(block, {
          props: { ...block.props, data: val, language: mode },
        });
      };

      const handleCopyCode = () => {
        navigator.clipboard.writeText(data || "");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      };

      return (
        <div
          style={{ position: "relative" }}
          className="code-ooo w-full focus-visible:outline-none outline-none"
        >
          <button
            className="z-50 hidden lg:block"
            onClick={handleCopyCode}
            style={{
              position: "absolute",
              top: "45px",
              right: "20px",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#333",
            }}
            title="Copy Code"
          >
            <Copy size="18" color="#344054" />
          </button>
          {copied && (
            <span
              style={{
                position: "absolute",
                top: "35px",
                right: "10px",
                backgroundColor: "#333",
                color: "#fff",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "12px",
                zIndex: "50",
                opacity: copied ? 1 : 0,
                transition: "opacity 0.3s",
              }}
            >
              Copied!
            </span>
          )}
          <Select
            value={mode}
            onValueChange={handleLanguageChange}
            className="absolute top-8 left-2 text-xs"
            disabled
          >
            <SelectTrigger className="w-24 text-xs">
              <SelectValue placeholder="Select language" className="text-xs" />
            </SelectTrigger>
            <SelectContent className="text-xs">
              <SelectItem value="javascript" className="text-xs">
                JavaScript
              </SelectItem>
              <SelectItem value="java" className="text-xs">
                Java
              </SelectItem>
              <SelectItem value="xml" className="text-xs">
                XML
              </SelectItem>
              <SelectItem value="typescript" className="text-xs">
                TypeScript
              </SelectItem>
              <SelectItem value="json" className="text-xs">
                JSON
              </SelectItem>
              <SelectItem value="yaml" className="text-xs">
                YAML
              </SelectItem>
              <SelectItem value="python" className="text-xs">
                Python
              </SelectItem>
              <SelectItem value="php" className="text-xs">
                PHP
              </SelectItem>
              <SelectItem value="sql" className="text-xs">
                SQL
              </SelectItem>
            </SelectContent>
          </Select>
          <ReactCodeMirror
            id={block?.id}
            basicSetup={{
              lineNumbers: false,
            }}
            options={{
              mode: mode,
            }}
            placeholder={"Insert your code here..."}
            style={{
              width: "100%",
              resize: "vertical",
              border: "2px solid #F7F6F3",
              borderRadius: "16px",
              padding: ".5rem",
              outline: "none",
            }}
            extensions={[langs[mode ? mode : "javascript"]()]}
            value={data}
            theme={"light"}
            editable={editor.isEditable}
            width="100%"
            height="auto"
            onChange={onInputChange}
          />
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

export const insertCode = () => ({
  title: "Code Editor",
  group: "Other",
  onItemClick: (editor) => {
    insertOrUpdateBlock(editor, {
      type: TYPE,
    });
  },
  aliases: ["code"],
  icon: <MdCode />,
  subtext: "Insert a code block.",
});
