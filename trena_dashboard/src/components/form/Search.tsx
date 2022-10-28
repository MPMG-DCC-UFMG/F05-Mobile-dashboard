import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { InputAdornment, TextField } from "@mui/material";
import { ManageSearch } from "@mui/icons-material";

interface SearchProps {
  onTextChanged: (event: React.ChangeEvent<HTMLInputElement>) => void,
  label: string,
}

export const Search: React.FC<SearchProps> = (props) => {
  return (
    <TextField
      fullWidth
      size="small"
      onChange={props.onTextChanged}
      label={props.label}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <ManageSearch/>
          </InputAdornment>
        ),
      }}
    />
  )
}
