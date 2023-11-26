import React from "react";

const Field = ({ children, className }) => {
  return (
    <div
      className={`flex flex-col justify-between gap-y-1 form-group ${className}`}
    >
      {children}
    </div>
  );
};

export default Field;
