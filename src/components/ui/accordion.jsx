"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { useRouter } from "next/navigation";
import { cn } from "@/libs/utils";
import { Add } from "iconsax-react";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
    <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(({ className, children, workspaceId, ...props }, ref) => {
    const router = useRouter();

    const handleAddClick = (e) => {
        e.stopPropagation();
        router.push(`/notes/workspace/${workspaceId}/document`); // Replace with the actual path to the BlockNote page
    };

    return (
        <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
                ref={ref}
                className={cn(
                    "group flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
                    className
                )}
                {...props}
            >
                <div className="flex items-center flex-row-reverse gap-2">
                    {children}
                </div>
                <Add
                    className="cursor-pointer invisible group-hover:visible"
                    size="24"
                    color="#344054"
                    onClick={handleAddClick}
                />
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    );
});

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        {...props}>
        <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
