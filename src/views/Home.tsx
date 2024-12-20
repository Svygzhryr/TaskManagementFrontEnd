import { Link } from "react-router";

export default function Login() {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        {/* <h3>Welcome, authorized user!</h3> */}
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
      </div>
    </>
  );
}
