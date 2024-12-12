import { LoginFormData, RegistrationFormData } from "./types";

export async function sendRegistrationRequest(formData: RegistrationFormData) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/register`,
      {
        method: "POST",
        body: JSON.stringify(formData),
      },
    );

    console.log(">>>", response);
  } catch (err) {
    console.error(err);
  }
}

export async function sendLoginRequest(formData: LoginFormData) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
      method: "POST",
      body: JSON.stringify(formData),
    });

    console.log(">>>", response);
  } catch (err) {
    console.error(err);
  }
}
