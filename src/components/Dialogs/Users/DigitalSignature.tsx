import { Upload } from "@mui/icons-material";
import { Typography, Button, Grid, IconButton } from "@mui/material";
import React from "react";
import {
  SingleDialogContainer,
  SingleDialogContainerProps,
} from "../DialogContainer";

export function DigitalSignature({
  title,
  state,
  setState,
}: SingleDialogContainerProps) {
  return (
    <SingleDialogContainer title={title} state={state} setState={setState}>
      <Grid style={{display: "flex", justifyContent: "flex-end"}}>
        <IconButton component="label">
          <Upload />
          <input type='file' accept="image/jpg" hidden/>
        </IconButton>    
      </Grid> 
      <Grid style={{display: "flex", justifyContent: "flex-start"}}>
        <Typography>Arraste aqui:</Typography>
      </Grid>
    </SingleDialogContainer>
  );
}
