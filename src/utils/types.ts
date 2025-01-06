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
  confirmPassword?: string;
}

export interface AuthResponse {
  username: string;
  access: string;
  refresh: string;
  isAuthorized: boolean;
}

export interface Tokens {
  access: string;
  refresh: string;
}

export type LoginFormData = Pick<RegistrationFormData, "username" | "password">;
