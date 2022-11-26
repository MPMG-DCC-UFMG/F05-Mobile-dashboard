import { InputAdornment, TextField } from "@mui/material";
import React from "react";

interface InfoTextFieldProps {
  label: string;
  icon: JSX.Element;
  fullWidth?: boolean;
  disabled?: boolean;
  defaultValue?: string | Date;
  value?: string | Date;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  multiline?: boolean;
}

export function InfoTextField({
  label,
  icon,
  fullWidth,
  disabled,
  defaultValue,
  value,
  onChange,
  type,
  multiline,
}: InfoTextFieldProps) {
  return (
    <TextField
      margin="normal"
      required
      fullWidth={fullWidth}
      label={label}
      disabled={disabled}
      defaultValue={defaultValue}
      value={value}
      type={type}
      onChange={onChange}
      multiline={multiline}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
    />
  );
}
