import {
    Button,
    Grid,
    TextField,
  } from "@mui/material";
  import React, { useState } from "react";
  import { useStores } from "../../../core/contexts/UseStores";
  import { TypePhoto } from "../../../core/models/TypePhoto";
  import {
    SingleDialogContainer,
    SingleDialogContainerProps,
  } from "../DialogContainer";
  
  export function AddTypeOfPhotoDialog({
    state,
    setState,
    title,
  }: SingleDialogContainerProps) {
    const { typePhotoStore } = useStores();
    const [namePhoto, setNamePhoto] = useState<string>("");
    const [description, setDescription] = useState<string>("");
   
    const handleAddTypeOfPhoto = () => {
      const photo: TypePhoto = { name: namePhoto, description: description,};
      typePhotoStore.addTypePhoto(photo);
      setState(false);
    };
  
    const handleCloseDialog = () => {
      setState(false);
    }
  
    return (
      <SingleDialogContainer state={state} setState={setState} title={title}>
        <TextField
          onChange={(event) => setNamePhoto(event.currentTarget.value)}
          required
          label="Tipo da Foto"
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
              onClick={handleAddTypeOfPhoto}
              color="success" variant="contained">
              Confirmar
            </Button>
          </Grid>
        </Grid>
      </SingleDialogContainer>
    );
  }