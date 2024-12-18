import { ChangeEvent } from "react";

export interface CinputProps {
  placeholder: string;
  handleOnChange?: (e: ChangeEvent) => void;
  error?: string | null;
  type: string;
}

export interface RegistrationFormData {
  username: string;
  password: string;
  confirmPassword: string;
}

export type LoginFormData = Pick<RegistrationFormData, "username" | "password">;
