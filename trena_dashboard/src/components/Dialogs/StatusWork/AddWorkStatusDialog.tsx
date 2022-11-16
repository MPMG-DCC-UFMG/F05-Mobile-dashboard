import {
    Button,
    Grid,
    TextField,
  } from "@mui/material";
  import React, { useState } from "react";
  import { useStores } from "../../../core/contexts/UseStores";
import { WorkStatus } from "../../../core/models/WorkStatus";
  import {
    SingleDialogContainer,
    SingleDialogContainerProps,
  } from "../DialogContainer";
  
  export function AddWorkStatusDialog({
    state,
    setState,
    title,
  }: SingleDialogContainerProps) {
    const { workStatusStore } = useStores();
    const [nameStatus, setNameStatus] = useState<string>("");
    const [description, setDescription] = useState<string>("");
   
    const handleAddWorkStatus = () => {
      const workStatus: WorkStatus = { name: nameStatus, description: description,};
      workStatusStore.addWorkStatus(workStatus);
      setState(false);
    };
  
    const handleCloseDialog = () => {
      setState(false);
    }
  
    return (
      <SingleDialogContainer state={state} setState={setState} title={title}>
        <TextField
          onChange={(event) => setNameStatus(event.currentTarget.value)}
          required
          label="Nome do estado da obra"
          fullWidth
        />
        <TextField 
          sx={{mt:2}}
          onChange={(event) => setDescription(event.currentTarget.value)}
          required
          label="Descrição"
          fullWidth
        />
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "flex-end", mt:2 }}
        >
          <Grid item display="flex">
            <Button 
             onClick={handleCloseDialog}
             color="error" variant="contained">
              Cancelar
            </Button>
          </Grid>
          <Grid item display="flex">
            <Button 
              onClick={handleAddWorkStatus}
              color="success" variant="contained">
              Confirmar
            </Button>
          </Grid>
        </Grid>
      </SingleDialogContainer>
    );
  }