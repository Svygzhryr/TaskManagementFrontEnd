import { jwtDecode } from "jwt-decode";

export const auth = {
  access: localStorage.getItem("access") ?? null,
  refresh: localStorage.getItem("refresh") ?? null,
};

let retries = 0;

export async function logout() {
  apiCall("/auth/logout", "POST", "logout");
  // возможно тут надо будет потом уточнять если ещё что-то хранить будем
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
  endpoint: string,
  method: string,
  options?: string,
  formData?: object,
) {
  try {
    const { access, refresh } = auth;
    const body = JSON.stringify(formData);
    const requestOptions = {
      method,
      ...(method !== "GET" && { body }),
      ...(options === "logout" && {
        body: JSON.stringify({ refresh: auth.refresh }),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    };

    console.log(localStorage.getItem("access"));
    console.log(access, refresh);

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}${endpoint}`,
      requestOptions,
    );

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      if (response.status === 401 && access && refresh) {
        console.log(access);
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
            return apiCall(endpoint, method, options, formData);
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
