import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";

export const headerToken = async () => {
  const session = await getServerSession(authOptions);
  console.log("Session : ", session);
  return {
    authorization: `Bearer ${session?.user?.token}`,
    "Content-Type": "application/json",
  };
};
