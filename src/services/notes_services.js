import {useSession} from "next-auth/react";

export const getAllWorkspaces = async () => {
    try {

        const session = useSession();
        
        console.log('session', session)

        const res = await fetch('https://the-workspace-service.jelay.site/api/v1/workspaces', {
            method: "GET",
            headers: {
                accept: "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.data?.token}`,
            },

        });

        console.log('all data ', await res.json)

        return await res.json();
    }catch (err) {
        console.error("Error fetching the workspaces data:", err);
    }
}