import { FC } from "react";
import { ButtonPrimaryProps } from "../utils/types";

export const ButtonPrimary: FC<ButtonPrimaryProps> = ({
  text,
  clickHandler,
  disabled,
}) => {
  return (
    <>
      <button
        onClick={clickHandler}
        className="w-32 px-4 py-2 text-2xl border-2 border-solid border-transparent hover:text-main-50 hover:border-main-50 transition-all disabled:pointer-events-none disabled:text-main-800"
        disabled={disabled ?? false}
      >
        {text}
      </button>
    </>
  );
};
