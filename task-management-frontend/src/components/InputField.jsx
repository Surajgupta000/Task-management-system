import React from "react";

const InputField = ({ type, placeholder, value, onChange, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`p-2 border rounded w-full ${className}`}
    />
  );
};

export default InputField;
