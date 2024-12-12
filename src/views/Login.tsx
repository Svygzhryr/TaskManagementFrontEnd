import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router";
import Cinput from "../components/Cinput";
import { sendLoginRequest } from "../utils/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLoginSubmit(e: FormEvent): void {
    e.preventDefault();

    const formData = {
      username,
      password,
    };

    sendLoginRequest(formData);
  }

  function usernameInputChange(e: ChangeEvent): void {
    const target = e.target as HTMLInputElement;
    setUsername(target.value);
  }

  function passwordInputChange(e: ChangeEvent): void {
    const target = e.target as HTMLInputElement;
    setPassword(target.value);
  }

  return (
    <>
      <form onSubmit={handleLoginSubmit}>
        <div className="flex flex-col gap-4 absolute top-1/2 left-1/2 text-center items-center -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-3xl mb-4">Login</h2>
          <Cinput
            placeholder="Username"
            type="text"
            handleOnChange={usernameInputChange}
          />
          <Cinput
            placeholder="Password"
            type="text"
            handleOnChange={passwordInputChange}
          />
          <button
            type="submit"
            className="px-8 py-2 mt-2 bg-neutral-800 w-auto text-xl hover:bg-neutral-700 transition-all"
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
