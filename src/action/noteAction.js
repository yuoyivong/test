"use server";

export const getAllWorkspaceAction = async () => {
    try {
        const response = await getAllWorkspaceAction();

        console.log('response', response)

        if (response?.code === 200) {
           return response
        } else {
            // Handle errors from the service
           console.log('error', response)
        }
    } catch (error) {
        console.error("Error fetching workspace:", error);
        throw error;
    }
}