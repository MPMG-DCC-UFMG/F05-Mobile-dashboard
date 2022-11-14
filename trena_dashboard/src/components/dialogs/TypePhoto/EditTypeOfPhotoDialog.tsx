import {
    Button,
    Grid,
    TextField,
  } from "@mui/material";
  import React, { useState } from "react";
  import { useStores } from "../../../core/contexts/UseStores";
import { TypePhoto } from "../../../core/models/TypePhoto";
  import {TableDialogContainer} from "../DialogContainer";

  interface EditTypeOfPhotoDialog{
    state: boolean[];
    setState(state: boolean[]): void;
    typePhoto: TypePhoto;
    index: number;
    title: string;
  }
  
  export function EditTypeOfPhotoDialog({
    state,
    setState,
    typePhoto,
    index,
    title,
  }: EditTypeOfPhotoDialog) {
    
    const {typePhotoStore } = useStores();
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    
    const handleCloseDialog = (index: number) =>{
      setState(state.map((value, position) => position === index ? false : value))
    }

    const handleEditTypePhoto = (typePhoto: TypePhoto) =>{
        typePhoto.name = name;
        typePhoto.description = description;
        typePhotoStore.updateTypePhoto(typePhoto);
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
          label='Tipo Da Foto'
          defaultValue={typePhoto.name}
          fullWidth
        />
         <TextField
          onChange={(event) => setDescription(event.currentTarget.value)}
          required
          label='Descrição Da Foto'
          defaultValue={typePhoto.description}
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
              onClick={()=> handleEditTypePhoto(typePhoto)}
              color="success" variant="contained">
              Salvar
            </Button>
          </Grid>
        </Grid> 
        </Grid>
        </TableDialogContainer>
    );
  }
  