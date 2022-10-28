import { ManageSearch } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import * as React from "react";

interface SearchProps {
  onTextChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string,
}

export function Search({ onTextChanged, label }: SearchProps) {
  return (
    <TextField
      fullWidth
      size="small"
      onChange={onTextChanged}
      label={label}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <ManageSearch />
          </InputAdornment>
        ),
      }}
    />
  )
}
