import { jwtDecode } from "jwt-decode";
import { ApiCallOptions, Endpoint } from "../types";

export const auth = {
  access: localStorage.getItem("access") ?? null,
  refresh: localStorage.getItem("refresh") ?? null,
};

let retries = 0;

function definePort(endpoint: Endpoint) {
  const portMap = {
    auth: import.meta.env.VITE_BACKEND_PORT_AUTH,
    task: import.meta.env.VITE_BACKEND_PORT_TASK,
    // остальные эндпоинты пойдут сюда
  };

  return portMap[endpoint];
}

export async function logout() {
  apiCall("/auth/logout", "POST", { logout: true });
  // возможно тут надо будет потом уточнять какие ключи удалять если ещё что-то хранить будем
  localStorage.clear();
  window.location.reload();
}

export async function refreshTokens() {
  try {
    retries = 0;
    const { access, refresh } = auth;
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({ refresh }),
      },
    );

    if (response.ok) {
      const tokens = await response.json();
      const { access, refresh } = tokens;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      auth.access = access;
      auth.refresh = refresh;
    } else {
      throw new Error(`An error has occured`);
    }
  } catch (err) {
    console.error(err);
  }
}

export async function apiCall(
  path: string,
  method: string,
  options?: ApiCallOptions,
  formData?: object,
) {
  try {
    const { access, refresh } = auth;
    const body = JSON.stringify(formData);
    const requestOptions = {
      method,
      ...(method !== "GET" && { body }),
      ...(options?.logout && {
        body: JSON.stringify({ refresh: auth.refresh }),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    };

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}:${definePort(options?.endpoint ?? "auth")}${path}`,
      requestOptions,
    );

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      if (response.status === 401 && access && refresh) {
        const { exp } = jwtDecode(access);
        const { exp: refreshExpire } = jwtDecode(refresh);

        console.log(
          "EXPIRATION \n",
          `current date - ${new Date(Date.now())} \n`,
          `token expires - ${new Date(exp! * 1000)}`,
        );

        const currentDate = new Date(Date.now());
        const tokenExpires = new Date(exp! * 1000);
        const refreshTokenExpires = new Date(refreshExpire! * 1000);

        console.log(tokenExpires, refreshTokenExpires);

        if (currentDate > refreshTokenExpires) {
          logout();
        }

        if (currentDate > tokenExpires) {
          await refreshTokens();

          if (retries < 5) {
            retries++;
            return apiCall(path, method, options, formData);
          }
        }
      } else {
        throw response.statusText;
      }
    }
  } catch (err) {
    console.error(err);
  }
}
