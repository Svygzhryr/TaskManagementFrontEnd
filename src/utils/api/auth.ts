export let auth = {
  access: localStorage.getItem("access") ?? null,
  refresh: localStorage.getItem("refresh") ?? null,
};

export async function apiCall(
  endpoint: string,
  method: string,
  options?: string,
  formData?: object,
) {
  try {
    const body = JSON.stringify(formData);
    const requestOptions = {
      method,
      ...(method !== "GET" && { body }),
      ...(options === "logout" && {
        body: JSON.stringify({ refresh: auth.refresh }),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.access}`,
      },
    };

    console.log(requestOptions);

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}${endpoint}`,
      requestOptions,
    );

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw response.statusText;
    }
  } catch (err) {
    console.error(err);
  }
}

export async function refreshTokens(
  refresh: string | null,
  access: string | null,
) {
  try {
    const refreshToken = { refresh };
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify(refreshToken),
      },
    );

    if (response.ok) {
      return response;
    } else {
      throw new Error(`An error has occured`);
    }
  } catch (err) {
    console.error(err);
  }
}

export function checkTokenExpiration() {}
