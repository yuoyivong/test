
import { baseUrl } from "@/utils/constants";

export const loginService = async (userInfo) => {
  const res = await fetch(`${baseUrl}/api/v1/authentication/login`, {
    method: "POST",
    body: JSON.stringify(userInfo),
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

// async function handleLogin(userInfo) {
//   console.log(userInfo);
//   const newUserInfo = {
//     email: userInfo.get("email"),
//     password: userInfo.get("password"),
//   };

//   const res = await signIn("credentials", {
//     redirect: false,
//     ...newUserInfo,
//   });

//   router.push("/task");
// }

export const registerService = async (userInfo) => {
  console.log("user info: ", userInfo);

  const res = await fetch(`${baseUrl}/api/v1/authentication/register`, {
    method: "POST",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  return await res.json();
};

// export const loginWithGoogle = async (googleInfo) => {
//   const res = await fetch(`${baseUrl}/api/v1/auth/login/Google`, {
//     method: "POST",
//     body: JSON.stringify(googleInfo),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const data = await res.json();
//   if (res.ok) {
//     return data;
//   } else {
//     throw new Error(data.error || "Login with Google failed");
//   }
// };
