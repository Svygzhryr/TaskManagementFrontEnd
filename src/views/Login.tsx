import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Link } from "react-router";
import { ButtonSubmit } from "../components/ButtonSubmit";
import Cinput from "../components/Cinput";
import { apiCall } from "../utils/api/auth";
import { UserContext } from "../utils/context";
import { VALIDATION_SCHEME } from "../utils/validation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const { setData } = useContext(UserContext);

  async function handleLoginSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();

    const formData = {
      username,
      password,
    };

    const tokens = await apiCall("/auth/login", "POST", "", formData);
    console.log(tokens);

    if (tokens) {
      localStorage.setItem("access", tokens.access);
      localStorage.setItem("refresh", tokens.refresh);
      setData(tokens);
      window.location.href = "/";
    } else {
      console.error("Unable to authenticate");
    }
  }

  function usernameInputChange(e: ChangeEvent): void {
    // надо бы вынести в хук
    const { username, general } = VALIDATION_SCHEME;
    const { rule: rule1, message: message1 } = general.not_empty;
    const { rule: rule2, message: message2 } = username.name_length;
    const { rule: rule3, message: message3 } = username.special_chars;
    const target = e.target as HTMLInputElement;
    const value = target.value;

    switch (true) {
      case rule1.test(value):
        setUsernameError(message1);
        break;
      case !rule2.test(value):
        setUsernameError(message2);
        break;
      case !rule3.test(value):
        setUsernameError(message3);
        break;
      default:
        setUsernameError("");
        break;
    }

    setUsername(value);
  }

  function passwordInputChange(e: ChangeEvent): void {
    const { general, password } = VALIDATION_SCHEME;
    const { rule: rule1, message: message1 } = general.not_empty;
    const { rule: rule2, message: message2 } = password.lowercase;
    const { rule: rule3, message: message3 } = password.uppercase;
    const { rule: rule4, message: message4 } = password.number;
    const { rule: rule5, message: message5 } = password.password_length;

    const target = e.target as HTMLInputElement;
    const value = target.value;

    switch (true) {
      case rule1.test(value):
        setPasswordError(message1);
        break;
      case !rule2.test(value):
        setPasswordError(message2);
        break;
      case !rule3.test(value):
        setPasswordError(message3);
        break;
      case !rule4.test(value):
        setPasswordError(message4);
        break;
      case !rule5.test(value):
        setPasswordError(message5);
        break;
      default:
        setPasswordError("");
        break;
    }

    setPassword(value);
  }

  return (
    <>
      <form onSubmit={handleLoginSubmit}>
        <div className="flex flex-col gap-2 absolute top-1/2 left-1/2 text-center items-center -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-3xl mb-4">Login</h2>
          <Cinput
            placeholder="Username"
            type="text"
            error={usernameError}
            handleOnChange={usernameInputChange}
          />
          <Cinput
            placeholder="Password"
            type="password"
            error={passwordError}
            handleOnChange={passwordInputChange}
          />
          {/* кнопку можно вынести в компонент */}
          <ButtonSubmit {...{ username, password }} />
          <Link to="/" className="text-sm hover:underline">
            Back to home
          </Link>
        </div>
      </form>
    </>
  );
}
