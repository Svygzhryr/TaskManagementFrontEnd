import { RegistrationFormData } from "./types";

export async function sendRegistrationRequest(formData: RegistrationFormData) {
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
      method: "POST",
      body: JSON.stringify(formData),
    });

    console.log(">>>", response);
  } catch (err) {
    console.error(err);
  }
}
