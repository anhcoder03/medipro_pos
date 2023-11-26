import React from "react";
import { useController } from "react-hook-form";

const Input = ({
  className = "input-primary",
  children,
  type,
  name = "",
  placeholder,
  control,
  ...rest
}) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });
  return (
    <div className="relative">
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        {...field}
        {...rest}
        className={`w-full h-[34px] text-[12px] placeholder:text-[12px] ${className}`}
      />
      {children && (
        <div className="absolute right-2 bg-white cursor-pointer select-none top-2/4 -translate-y-2/4">
          {children}
        </div>
      )}
    </div>
  );
};

export default Input;
