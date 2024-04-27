import React from "react";
import { IFieldProps } from "./types";
import styles from "./style.module.css";

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
  const { fieldContainer, errorText } = styles;
  return (
    <div className={fieldContainer}>
      <label htmlFor={labelName}>{labelName}:</label>
      <input
        id={labelName}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        type={type}
      />
      {error && <p className={errorText}>{error}</p>}
    </div>
  );
};
export default Field;
