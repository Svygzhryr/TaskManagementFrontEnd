import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link } from "react-router";
import Cinput from "../components/Cinput";
import { sendRegistrationRequest } from "../utils/api";
import { VALIDATION_SCHEME } from "../utils/validation";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmError, setConfirmError] = useState<string>("");

  function handleRegisterSubmit(e: FormEvent): void {
    e.preventDefault();

    const formData = {
      username,
      password,
      confirmPassword,
    };

    sendRegistrationRequest(formData);
  }

  function usernameInputChange(e: ChangeEvent): void {
    const { username, general } = VALIDATION_SCHEME;
    const { rule: rule1, message: message1 } = general.not_empty;
    const { rule: rule2, message: message2 } = username.name_length;
    const { rule: rule3, message: message3 } = username.special_chars;
    const target = e.target as HTMLInputElement;
    const value = target.value;

    console.log(value);

    console.log(rule1.test(value));

    // возможно переделать в свич
    if (rule1.test(value)) {
      setUsernameError(message1);
    } else if (!rule2.test(value)) {
      setUsernameError(message2);
    } else if (!rule3.test(value)) {
      setUsernameError(message3);
    } else {
      setUsernameError("");
    }

    setUsername(value);
  }

  function passwordInputChange(e: ChangeEvent): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    setPassword(value);
  }

  function confirmationInputChange(e: ChangeEvent): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    setConfirmPassword(value);
  }

  useEffect(() => {
    console.log(usernameError);
  }, [usernameError]);

  return (
    <>
      <form onSubmit={handleRegisterSubmit}>
        <div className="flex flex-col gap-4 absolute top-1/2 left-1/2 text-center items-center -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-3xl mb-4">Sign up</h2>
          <Cinput
            placeholder="Username"
            type="text"
            error={usernameError}
            handleOnChange={usernameInputChange}
          />
          <Cinput
            placeholder="Password"
            type="password"
            handleOnChange={passwordInputChange}
          />
          <Cinput
            placeholder="Confirm password"
            type="password"
            handleOnChange={confirmationInputChange}
          />
          <button
            disabled={
              !username.length || !password.length || !confirmPassword.length
            }
            type="submit"
            className="px-8 py-2 mt-2 bg-neutral-800 w-auto text-xl hover:bg-neutral-700 transition-all disabled:pointer-events-none disabled:text-neutral-600"
          >
            Submit
          </button>
          <Link to="/" className="text-sm hover:underline">
            Back to home
          </Link>
        </div>
      </form>
    </>
  );
}
