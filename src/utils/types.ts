import { ChangeEvent } from "react";

export interface CinputProps {
  placeholder: string;
  handleOnChange?: (e: ChangeEvent) => void;
  type: string;
}

export interface RegistrationFormData {
  username: string;
  password: string;
  confirmPassword: string;
}
