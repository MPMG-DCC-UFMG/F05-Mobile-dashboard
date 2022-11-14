import {
    Button,
    Grid,
    TextField,
  } from "@mui/material";
import React, { useState } from "react";
import { useStores } from "../../../core/contexts/UseStores";
import { WorkStatus } from "../../../core/models/WorkStatus";
import {TableDialogContainer} from "../DialogContainer";

  interface EditWorkStatusDialog{
    state: boolean[];
    setState(state: boolean[]): void;
    workStatus: WorkStatus;
    index: number;
    title: string;
  }
  
  export function EditWorkStatusDialog({
    state,
    setState,
    workStatus,
    index,
    title,
  }: EditWorkStatusDialog) {
    
    const {workStatusStore } = useStores();
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    
    const handleCloseDialog = (index: number) =>{
      setState(state.map((value, position) => position === index ? false : value))
    }

    const handleEditWorkStatus = (workStatus: WorkStatus) =>{
        workStatus.name = name;
        workStatus.description = description;
        workStatusStore.updateWorkStatus(workStatus);
        handleCloseDialog(index);
    }
  
    return (
      <TableDialogContainer
        state={state}
        setState={setState}
        index={index}
        title={title}
      >
        <Grid container justifyContent="space-between" alignItems="center">
        <TextField
          onChange={(event) => setName(event.currentTarget.value)}
          required
          label='Estado Da Obra'
          defaultValue={workStatus.name}
          fullWidth
        />
         <TextField
          onChange={(event) => setDescription(event.currentTarget.value)}
          required
          label='Descrição'
          defaultValue={workStatus.description}
          fullWidth
          sx={{mt:2}}
        />
         <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "flex-end", mt:2 }}
        >
          <Grid item display="flex">
            <Button 
             onClick={() => handleCloseDialog(index)}
             color="error" variant="contained">
              Cancelar
            </Button>
          </Grid>
          <Grid item display="flex">
            <Button 
              onClick={()=> handleEditWorkStatus(workStatus)}
              color="success" variant="contained">
              Salvar
            </Button>
          </Grid>
        </Grid> 
        </Grid>
        </TableDialogContainer>
    );
  }
  