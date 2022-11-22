import {
  Button,
  Checkbox,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useStores } from "../../../core/contexts/UseStores";
import { TypeWork } from "../../../core/models/TypeWork";
import { TableDialogContainer } from "../DialogContainer";


interface EditTypeOfWorkDialog{
  state: boolean[];
  setState(state: boolean[]): void;
  typeWork: TypeWork;
  index: number;
  title: string;
}

export function EditTypeOfWorkDialog({
  state,
  setState,
  typeWork,
  index,
  title,
}: EditTypeOfWorkDialog) {
  
  const { typeWorkStore, typePhotoStore } = useStores();
  const [form, setForm] = useState<string>("");
  
  const handleCloseDialog = (index: number) =>{
    setState(state.map((value, position) => position === index ? false : value))
  }

  const handleTypeOfWorkStatus = (typeWork: TypeWork) =>{
    typeWork.name = form;
    typeWorkStore.updateTypeWork(typeWork);
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
        onChange={(event) => setForm(event.currentTarget.value)}
        required
        label='Tipo da Obra'
        defaultValue={typeWork.name}
        fullWidth
      />
      <TableContainer>
        <Table>
          {typePhotoStore.typePhotoList.map((options) => (
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{options.name}</TableCell>
            </TableRow>
          ))}
        </Table>
      </TableContainer>
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
            onClick={()=> handleTypeOfWorkStatus(typeWork)}
            color="success" variant="contained">
            Salvar
          </Button>
        </Grid>
      </Grid> 
      </Grid>
      </TableDialogContainer>
  );
}

  