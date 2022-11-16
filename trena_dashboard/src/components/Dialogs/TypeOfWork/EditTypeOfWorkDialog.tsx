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
  import {
    SingleDialogContainer,
    SingleDialogContainerProps,
  } from "../DialogContainer";
  
  export function EditTypeOfWorkDialog({
    state,
    setState,
    title,
  }: SingleDialogContainerProps, typeWork: TypeWork) {
    const { typeWorkStore, typePhotoStore } = useStores();
    const [form, setForm] = useState<string>("");
   
    const handleEditTypeOfWork = () => {
      const work: TypeWork = { name: form, status_list: [] };
      typeWorkStore.updateTypeWork(work);
      setState(false);
    };
  
    const handleCloseDialog = () => {
      setState(false);
    }
  
    return (
      <SingleDialogContainer state={state} setState={setState} title={title}>
        <TextField
          onChange={(event) => setForm(event.currentTarget.value)}
          required
          label="Tipo da Obra"
          defaultValue={typeWork.name}
          fullWidth
        />
        <Typography sx={{ mt: 3 }} variant="subtitle1">
          Tipos de Foto:
        </Typography>
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
             onClick={handleCloseDialog}
             color="error" variant="contained">
              Cancelar
            </Button>
          </Grid>
          <Grid item display="flex">
            <Button 
              onClick={handleEditTypeOfWork}
              color="success" variant="contained">
              Confirmar
            </Button>
          </Grid>
        </Grid>
      </SingleDialogContainer>
    );
  }
  