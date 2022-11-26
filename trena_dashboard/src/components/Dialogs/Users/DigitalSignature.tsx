import { Typography, Button, Grid } from "@mui/material";
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
      <Grid 
        display='flex'
        justifyContent="space-evenly"
        alignItems="center"
      >  
        <Typography>Escolha o arquivo</Typography>
        <Button 
          style={{height: 30}}
          variant="contained">Pesquisar Arquivo</Button>
      </Grid>
    </SingleDialogContainer>
  );
}
