import React, { ChangeEvent, KeyboardEventHandler } from "react";
import TextField from "@material-ui/core/TextField";

interface InputPropTypes {
  value: string;
  handleChange: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  placeholder?: string;
  label: string;
  className?: string;
  disabled?: boolean;
  handleKeyDown?: KeyboardEventHandler<HTMLDivElement> | undefined;
  style?: React.CSSProperties;
}

const Input = React.forwardRef((props: InputPropTypes, ref) => {
  const {
    disabled = false,
    handleChange,
    placeholder,
    label,
    value,
    className,
    handleKeyDown,
    style,
  } = props;

  return (
    <TextField
      style={style}
      inputRef={ref}
      className={className}
      onChange={handleChange}
      id="standard-basic"
      label={label}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onKeyDown={handleKeyDown}
      autoComplete="off"
    />
  );
});

export default Input;
