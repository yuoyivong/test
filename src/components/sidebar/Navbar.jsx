'use client'

import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandList,
} from "@/components/ui/command"
import { NotificationKnock } from "./../knock/NotificationKnock"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { AutoComplete } from "../alternative/AutoComplete";
import { useSession } from "next-auth/react";

const DataGG = [
    {
        link: "/question/1",
        value: "/question/1",
        label: "Springboot with JdbcTemplate reading 100 column eventually turn into 'Resultset is closed'",
    },
    {
        link: "/question/2",
        value: "/question/2",
        label: "Compilation issues in MacOs",
    },
]

const Navbar = () => {
    const { data: session, status} = useSession()

    const [inputValue, setInputValue] = useState('');
    const [isLoading, setLoading] = useState(false)
    const [isDisabled, setDisbled] = useState(false)
    const [value, setValue] = useState();

    const [auth, setAuth] = useState();

    useEffect(() => {
        const gg = JSON.parse(localStorage.getItem("auth"));
        setAuth(gg);
    }, [])

    return (
        <div className="flex justify-between items-center w-full">
            <div className="relative h-full w-full">
                {/* <Command className={`${inputValue !== '' && 'shadow-xl'} rounded-2xl md:min-w-[450px] w-fit h-12 justify-center absolute -top-5 z-50`} id="tooltip-select-4">
                    <CommandInput onValueChange={setInputValue} placeholder="Search" className="h-full" />
                    <CommandList className={`${inputValue == '' ? '!hidden' : 'block shadow-xl'}`}>
                        <CommandEmpty>No results found.</CommandEmpty>
                    </CommandList>
                </Command> */}
                <AutoComplete
                    className="w-2/3 sm:w-1/2 xl:w-[450px] h-12 items-center"
                    options={DataGG}
                    emptyMessage="No resulsts."
                    placeholder="Search"
                    isLoading={isLoading}
                    onValueChange={setValue}
                    value={value}
                    disabled={isDisabled}
                />
            </div>
            {status === "authenticated" ?
                <div className="p-2 rounded-full bg-white" id="tooltip-select-5">
                    <NotificationKnock />
                </div>
                :
                <div className="flex gap-6 items-center text-xs lg:text-sm 2xl:text-base">
                    <Link className="text-blackUi hover:text-lessBlackUi duration-300 whitespace-nowrap" href={"/register"}>
                        Sign Up
                    </Link>
                    <Link className="flex justify-center items-center w-[72px] lg:w-[130px] h-[32px] lg:h-[44px] bg-blackUi rounded-2xl text-white text-center whitespace-nowrap" href={"/login"}>
                        Login
                    </Link>
                </div>
            }
        </div>
    )
}

export default Navbar