import { FC } from "react";
import { CinputProps } from "../utils/types";

const Cinput: FC<CinputProps> = ({
  placeholder,
  handleOnChange,
  type,
  error,
}) => {
  return (
    <>
      <input
        placeholder={placeholder}
        onChange={handleOnChange}
        type={type}
        className="px-4 py-2 text-xl bg-main-800 outline-none border-2 border-transparent focus:border-main-text transition-all placeholder:text-main-500"
      />
      <p className="text-sm">{error}</p>
    </>
  );
};

export default Cinput;
