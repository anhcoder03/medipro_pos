import React from "react";

const Label = ({ htmlFor, className = "text-gray81", children }) => {
  return (
    <label htmlFor={htmlFor} className={` ${className}`}>
      {children}
    </label>
  );
};

export default Label;
