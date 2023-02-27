import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { User } from "../../../../core/models/User";
import { LoggedUserResponse, SecurityServiceQuery } from "../../../../core/network/services/SecurityService";
import { SingleDialogContainer } from "../../DialogContainer";

interface EditUserEmailDialog {
  state: boolean;
  setState(state: boolean): void;
  title: string;
}

export function EditUserEmailDialog({
  state,
  setState,
  title,
}: EditUserEmailDialog) {
  
  const [email, setEmail] = useState<string>("");
  const { data: userData } = useQuery<LoggedUserResponse>(
    ["getLoggedUserData"],
    () => SecurityServiceQuery.getLoggedUser()
  );
  const handleCloseDialog = () => {
    setState(false);
  };

  const handleEditUser = () =>{
    handleCloseDialog();
}

//   const handleEditUser = (user: User) => {
//     user.email = email;
//     handleCloseDialog();
//   };

  return (
    <SingleDialogContainer state={state} setState={setState} title={title}>
      <Grid container justifyContent="space-between" alignItems="center">
        <TextField
          onChange={(event) => setEmail(event.currentTarget.value)}
          required
          label="Email do Usuário"
          defaultValue={userData?.email}
          fullWidth
        />
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
        >
          <Grid item display="flex">
            <Button
              onClick={() => handleCloseDialog()}
              color="error"
              variant="contained"
            >
              Cancelar
            </Button>
          </Grid>
          <Grid item display="flex">
            <Button
              color="success"
              variant="contained"
              onClick={()=> handleEditUser()}
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </SingleDialogContainer>
  );
}
