import {
    Button,
    Grid,
    TextField,
  } from "@mui/material";
  import React, { useState } from "react";
  import { User } from "../../../core/models/User";
import { TableDialogContainer } from "../DialogContainer";

  interface EditUserDialog{
    state: boolean[];
    setState(state: boolean[]): void;
    user: User;
    index: number;
    title: string;
  }
  
  export function EditUserDialog({
    state,
    setState,
    user,
    index,
    title,
  }: EditUserDialog) {
    
    const [email, setEmail] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const handleCloseDialog = (index: number) =>{
      setState(state.map((value, position) => position === index ? false : value))
    }

    const handleEditUser = (user: User) =>{
        user.email = email;
        user.role = role;
        user.token = password;
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
          onChange={(event) => setEmail(event.currentTarget.value)}
          required
          label='Email do Usuário'
          defaultValue={user.email}
          fullWidth
        />
         <TextField
          onChange={(event) => setRole(event.currentTarget.value)}
          required
          label='Função do Usuário'
          defaultValue={user.role}
          fullWidth
          sx={{mt:2}}
        />
        <TextField
          onChange={(event) => setPassword(event.currentTarget.value)}
          required
          label='Senha do Usuário'
          defaultValue={user.token}
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
              onClick={()=> handleEditUser(user)}
              color="success" variant="contained">
              Salvar
            </Button>
          </Grid>
        </Grid> 
        </Grid>
        </TableDialogContainer>
    );
  }
  