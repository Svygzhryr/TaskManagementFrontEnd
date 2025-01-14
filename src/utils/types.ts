import { ChangeEvent, Dispatch } from "react";

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

export interface ProjectCreateFormProps {
  setIsFormActive: Dispatch<React.SetStateAction<boolean>>;
}

export interface ButtonPrimaryProps {
  text: string;
  clickHandler?: () => void;
  disabled?: boolean;
}

export interface NotificationProps {
  message: string;
  type?: "default" | "alert" | "error";
}

export type Endpoint = "auth" | "task";

export interface ApiCallOptions {
  logout?: boolean;
  endpoint?: Endpoint;
}

export type LoginFormData = Pick<RegistrationFormData, "username" | "password">;
