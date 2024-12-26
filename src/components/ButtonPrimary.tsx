import { FC } from "react";

interface ButtonPrimaryProps {
  text: string;
  clickHandler?: () => void;
}

export const ButtonPrimary: FC<ButtonPrimaryProps> = ({
  text,
  clickHandler,
}) => {
  return (
    <>
      <button
        onClick={clickHandler}
        className="w-32 px-4 py-2 text-2xl border-2 border-solid border-transparent hover:text-main-50 hover:border-main-50 transition-all"
      >
        {text}
      </button>
    </>
  );
};
