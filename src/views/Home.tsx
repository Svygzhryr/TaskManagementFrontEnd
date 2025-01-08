import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../utils/context";
import { ButtonPrimary } from "../components/ButtonPrimary";
import { apiCall, logout } from "../utils/api/auth";

export default function Home() {
  const {
    data: { isAuthorized },
  } = useContext(UserContext);

  function handleUserLogout() {
    logout();
  }

  async function handleMeClick() {
    const response = await apiCall("/auth/user", "GET");
    console.log(response);
  }

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        {isAuthorized ? (
          <>
            <h3 className="mb-3">
              Welcome, юзернейм имени которого я не знаю потому что мне пришлось
              убирать контекст, но имя которого я могу получить запросом в любой
              момент если понадобится!
            </h3>
            <ButtonPrimary text="GetMe" clickHandler={handleMeClick} />
            <ButtonPrimary text="Logout" clickHandler={handleUserLogout} />
          </>
        ) : (
          <>
            <h3 className="mb-10 text-3xl">You should authorize first</h3>
            <div className="flex justify-evenly">
              <Link
                to="/register"
                className="w-32 px-4 py-2 border-2 border-solid border-transparent hover:text-main-100 hover:border-main-100 transition-all"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="w-32 px-4 py-2 border-2 border-solid border-transparent hover:text-main-error hover:border-main-error transition-all
              "
              >
                Login
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
