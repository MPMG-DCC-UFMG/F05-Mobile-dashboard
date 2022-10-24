import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { InputAdornment, TextField } from "@mui/material";
import { ManageSearch } from "@mui/icons-material";

interface SearchProps {
  onTextChanged: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Search: React.FC<SearchProps> = (props) => {
  return (
    <TextField
      fullWidth
      size="small"
      onChange={props.onTextChanged}
      label="Tipo de Obra"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <ManageSearch/>
          </InputAdornment>
        ),
      }}
    />
    // <p className="control has-icons-left">
    //     <input className="input" type="text" placeholder="Buscar" onChange={props.onTextChanged}/>
    //     <span className="icon is-left">
    //         <FontAwesomeIcon icon={faSearch}/>
    //     </span>
    // </p>
  )
}
