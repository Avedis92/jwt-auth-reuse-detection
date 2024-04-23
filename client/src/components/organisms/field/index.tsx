import React from "react";
import { IFieldProps } from "./types";

const Field = ({
  labelName,
  placeholder,
  onChange,
  value,
  error,
  type,
}: IFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div>
      <label htmlFor={labelName}>{labelName}</label>
      <input
        id={labelName}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        type={type}
      />
      {error && <div>{error}</div>}
    </div>
  );
};
export default Field;
