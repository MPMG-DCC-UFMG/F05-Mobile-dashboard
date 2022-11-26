import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { User } from "../../../../core/models/User";
import { SingleDialogContainer } from "../../DialogContainer";

interface EditUserEmailDialog {
  state: boolean;
  setState(state: boolean): void;
  user: string;
  title: string;
}

export function EditUserEmailDialog({
  state,
  setState,
  user,
  title,
}: EditUserEmailDialog) {
  const [email, setEmail] = useState<string>("");

  const handleCloseDialog = () => {
    setState(false);
  };

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
          defaultValue={user}
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
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </SingleDialogContainer>
  );
}
