export interface IFieldProps {
  labelName: string;
  placeholder: string;
  value: string;
  error?: string;
  type: "text" | "password";
  onChange: (inputValue: string) => void;
}
