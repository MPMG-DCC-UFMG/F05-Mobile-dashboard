import {
    Button,
    Grid,
    TextField,
  } from "@mui/material";
  import React, { useState } from "react";
  import { useStores } from "../../../core/contexts/UseStores";
import { User } from "../../../core/models/User";
  import {
    SingleDialogContainer,
    SingleDialogContainerProps,
  } from "../DialogContainer";
  
  export function AddUsersDialog({
    state,
    setState,
    title,
  }: SingleDialogContainerProps) {
    const { userStore} = useStores();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("");
   
    const handleAddUsers = () => {
      const user: User = { email: email, token: password, role: role};
      userStore.createUser(user.email, user.token);
      setState(false);
    };
  
    const handleCloseDialog = () => {
      setState(false);
    }
  
    return (
      <SingleDialogContainer state={state} setState={setState} title={title}>
        <TextField
          onChange={(event) => setEmail(event.currentTarget.value)}
          required
          label="Email do Usuário"
          fullWidth
        />
        <TextField
          sx={{mt:2}}
          onChange={(event) => setPassword(event.currentTarget.value)}
          required
          label="Senha do Usuário"
          fullWidth
        />
        <TextField
          sx={{mt:2}}
          onChange={(event) => setRole(event.currentTarget.value)}
          required
          label="Nível do Usuário"
          fullWidth
        />
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "flex-end", mt:2}}
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
              onClick={handleAddUsers}
              color="success" variant="contained">
              Confirmar
            </Button>
          </Grid>
        </Grid>
      </SingleDialogContainer>
    );
  }
  