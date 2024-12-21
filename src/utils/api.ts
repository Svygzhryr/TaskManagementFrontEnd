import { LoginFormData, RegistrationFormData } from "./types";

export async function sendLoginRequest(formData: LoginFormData) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }
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

export async function sendRegistrationRequest(formData: RegistrationFormData) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const tokens = sendLoginRequest(formData);

      return tokens;
    } else {
      throw response.statusText;
    }
  } catch (err) {
    console.error(err);
  }
}
