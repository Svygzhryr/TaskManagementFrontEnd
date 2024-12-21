import { FC, useEffect, useState } from "react";

export const ButtonSubmit: FC<Record<string, string | undefined>> = (props) => {
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    // честно говоря не было ни одной причины делать всё настолько сложно
    const errors: (string | undefined)[] = [],
      values: (string | undefined)[] = [];
    Object.keys(props).map((key) => {
      if (key.includes("Error")) {
        errors.push(props[key]);
      } else {
        values.push(props[key]);
      }
    });

    setIsDisabled(
      !(values.every((value) => !!value) && errors.every((error) => !error))
    );
  }, [props]);

  return (
    <>
      <button
        disabled={isDisabled}
        type="submit"
        className="px-8 py-2 mt-2 bg-main-800 w-auto text-xl hover:bg-main-700 transition-all disabled:pointer-events-none disabled:text-main-600"
      >
        Submit
      </button>
    </>
  );
};
