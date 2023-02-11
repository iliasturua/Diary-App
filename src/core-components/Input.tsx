import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = (props: InputProps) => {
  return (
    <div>
      <input {...props} className={`${props.className}`} />
    </div>
  );
};

export default Input;
