import { FC } from "react";
import { CinputProps } from "../utils/types";

const Cinput: FC<CinputProps> = ({ placeholder, handleOnChange, type }) => {
  return (
    <>
      <input
        placeholder={placeholder}
        onChange={handleOnChange}
        type={type}
        className="px-4 py-2 text-xl bg-neutral-800 outline-none border-2 border-transparent focus:border-neutral-200 transition-all"
      />
    </>
  );
};

export default Cinput;
