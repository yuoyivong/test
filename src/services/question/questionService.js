"use server"

import { headerToken } from "@/app/api/headerToken";

export const getAllQuestion = async () => {
    try {
        const header = await headerToken()
        const res = await fetch(`${process.env.API_URL}/question`, {
            next: { tags: ['question'] },
            cache: "no-store",
            headers: header
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching the agenda data:", error);
    }
};