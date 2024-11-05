import { baseUrl } from "@/utils/constants";

export const registerService = async (userInfo) => {
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

export const verifyService = async (otp, email, type) => {
  const res = await fetch(
    `${baseUrl}/api/v1/authentication/verify?email=${email}&type=${type}&otpCode=${otp}`,
    {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    }
  );

  return await res.json();
};

export const resendOtpService = async (email, type) => {
  const res = await fetch(
    `${baseUrl}/api/v1/authentication/resendOtp?email=${email}&type=${type}`,
    {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    }
  );

  return await res.json();
};

export const getUserByEmailService = async (email) => {
  const res = await fetch(`${baseUrl}/api/v1/users/email?email=${email}`, {
    method: "GET",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
  });

  return await res.json();
};

export const forgetPasswordService = async (data, email) => {
  const res = await fetch(
    `${baseUrl}/api/v1/authentication/forget?email=${email}`,
    {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: data.password,
        confirmPassword: data.confirmPassword,
      }),
    }
  );

  return await res.json();
};

// login service
export const loginService = async (userInfo) => {
  const loginRequest = {
    client_id: "stack-notes-client",
    client_secret: "tDbzKXKsHvvmFQAJ1bUSR87Dbia2ssfZ",
    username: userInfo?.username,
    password: userInfo?.password,
    grant_type: "password",
    scope: "openid",
  };

  const keycloakTokenReq = await fetch(
    `https://keycloak.jelay.site/realms/stack-notes/protocol/openid-connect/token`,
    {
      cache: "no-store",
      method: "POST",
      "Content-Type": "application/x-www-form-urlencoded",
      body: new URLSearchParams(loginRequest),
    }
  );

  const token = await keycloakTokenReq.json();
  return token;
};
