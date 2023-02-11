import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={`bg-transparent rounded-full py-2 px-4 border border-black mx-1 my-2 ${props.className}`}
    />
  );
};

export default Button;
