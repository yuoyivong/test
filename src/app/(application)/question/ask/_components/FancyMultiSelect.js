'use client';

import { useState, useRef, useCallback } from "react"
import { Badge } from "@/components/ui/badge";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Record } from "iconsax-react";
import { ArrowDown2 } from "iconsax-react";
import { Add } from "iconsax-react";

const FRAMEWORKS = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
    {
        value: "wordpress",
        label: "WordPress",
    },
    {
        value: "express.js",
        label: "Express.js",
    },
    {
        value: "nest.js",
        label: "Nest.js",
    },
];

export const FancyMultiSelect = ({className}) => {
    const inputRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([FRAMEWORKS[0]]);
    const [inputValue, setInputValue] = useState("");

    const handleUnselect = useCallback((framework) => {
        setSelected((prev) => prev.filter((s) => s.value !== framework.value));
    }, []);

    const handleKeyDown = useCallback(
        (e) => {
            const input = inputRef.current;
            if (input) {
                if (e.key === "Delete" || e.key === "Backspace") {
                    if (input.value === "") {
                        setSelected((prev) => {
                            const newSelected = [...prev];
                            newSelected.pop();
                            return newSelected;
                        });
                    }
                }
                if (e.key === "Escape") {
                    input.blur();
                }
            }
        },
        []
    );

    const selectables = FRAMEWORKS.filter(
        (framework) => !selected.includes(framework)
    );

    return (
        <Command
            onKeyDown={handleKeyDown}
            className="overflow-visible bg-transparent"
        >
            <div className={`bg-[#F7F9FB] group px-3 py-2 text-sm rounded-radiusUi ${className}`}>
                <div className="flex items-center flex-wrap gap-1">
                    {selected.map((framework) => (
                        <Badge key={framework.value} variant="secondary" className={"bg-white text-blackUi rounded-lg"}>
                            {framework.label}
                            <button
                                className="ml-1 px-1 py-2 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleUnselect(framework);
                                    }
                                }}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                                onClick={() => handleUnselect(framework)}
                            >
                                <Add size="18" className="-rotate-45" color="#344054" />
                            </button>
                        </Badge>
                    ))}
                    {/* Avoid having the "Search" Icon */}
                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={setInputValue}
                        onBlur={() => setOpen(false)}
                        onFocus={() => setOpen(true)}
                        placeholder="Select Tag..."
                        className="ml-2 py-2 placeholder:text-[#98A2B3] placeholder:font-light flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                    />
                    <ArrowDown2 size="20" color="#344054"/>
                </div>
            </div>
            <div className="relative mt-2">
                <CommandList>
                    {open && selectables.length > 0 ? (
                        <div className="absolute top-0 z-10 w-full rounded-radiusUi border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                            <CommandGroup className="h-full overflow-auto">
                                {selectables.map((framework) => (
                                    <CommandItem
                                        key={framework.value}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        onSelect={(value) => {
                                            setInputValue("");
                                            setSelected((prev) => [...prev, framework]);
                                        }}
                                        className={"cursor-pointer text-blackUi hover:text-blackUi"}
                                    >
                                        {framework.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </div>
                    ) : null}
                </CommandList>
            </div>
        </Command>
    );
};
