import {
    CommandGroup,
    CommandItem,
    CommandList,
    CommandInput,
} from "./../ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { useState, useRef, useCallback } from "react";

import { Skeleton } from "./../ui/skeleton";
import { Check } from "lucide-react";
import { cn } from "@/libs/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const AutoComplete = ({
    options,
    placeholder,
    emptyMessage,
    value,
    onValueChange,
    disabled,
    isLoading = false,
    className
}) => {
    const inputRef = useRef(null);
    const router = useRouter();

    const [isOpen, setOpen] = useState(false);
    const [selected, setSelected] = useState(value);
    const [inputValue, setInputValue] = useState(value?.label || "");

    const handleKeyDown = useCallback(
        (event) => {
            const input = inputRef.current;
            if (!input) {
                return;
            }

            if (!isOpen) {
                setOpen(true);
            }
            if (event.key === "Enter" && input.value !== "") {
                { input.value.toLowerCase().includes("spring".toLowerCase()) ? router.push("/question/1") : router.push("/question/2"); }
                const optionToSelect = options.find(
                    (option) => option.label === input.value
                );
                if (optionToSelect) {
                    setSelected(optionToSelect);
                    onValueChange?.(optionToSelect);
                }
            }

            if (event.key === "Escape") {
                input.blur();
            }
        },
        [isOpen, options, onValueChange]
    );

    const handleBlur = useCallback(() => {
        setOpen(false);
        setInputValue(selected?.label);
    }, [selected]);

    const handleSelectOption = useCallback(
        (selectedOption) => {
            setInputValue(selectedOption.label);
            setSelected(selectedOption);
            onValueChange?.(selectedOption);

            setTimeout(() => {
                inputRef?.current?.blur();
            }, 0);
        },
        [onValueChange]
    );

    return (
        <CommandPrimitive onKeyDown={handleKeyDown} className={`bg-white rounded-xl ${className}`}>
            <div className="h-full">
                <CommandInput
                    ref={inputRef}
                    value={inputValue}
                    onValueChange={isLoading ? undefined : setInputValue}
                    onBlur={handleBlur}
                    onFocus={() => setOpen(true)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="text-base"
                />
            </div>
            <div className="relative mt-1">
                <div
                    className={cn(
                        "animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-white outline-none",
                        isOpen ? "block" : "hidden"
                    )}
                >
                    <CommandList className="rounded-lg ring-1 ring-slate-200">
                        {isLoading ? (
                            <CommandPrimitive.Loading>
                                <div className="p-1">
                                    <Skeleton className="h-8 w-full" />
                                </div>
                            </CommandPrimitive.Loading>
                        ) : null}
                        {options.length > 0 && !isLoading ? (
                            <CommandGroup>
                                {options.map((option) => {
                                    const isSelected = selected?.value === option.value;
                                    return (
                                        <Link href={`${option.link}`}>
                                            <CommandItem
                                                key={option.value}
                                                value={option.label}
                                                onMouseDown={(event) => {
                                                    event.preventDefault();
                                                    event.stopPropagation();
                                                }}
                                                onSelect={() => handleSelectOption(option)}
                                                className={cn(
                                                    "flex w-full items-center gap-2",
                                                    !isSelected ? "pl-8" : null
                                                )}
                                            >
                                                {isSelected ? <Check className="w-4" /> : null}
                                                {option.label}
                                            </CommandItem>
                                        </Link>
                                    );
                                })}
                            </CommandGroup>
                        ) : null}
                        {!isLoading ? (
                            <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                                {emptyMessage}
                            </CommandPrimitive.Empty>
                        ) : null}
                    </CommandList>
                </div>
            </div>
        </CommandPrimitive>
    );
};
