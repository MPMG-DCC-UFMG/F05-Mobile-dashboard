import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { CreateUserDTO } from "../../../core/models/dto/user/CreateUserDTO";
import { SecurityServiceQuery } from "../../../core/network/services/SecurityService";
import { Notify } from "../../Toast/Notify";
import {
  SingleDialogContainer,
  SingleDialogContainerProps,
} from "../DialogContainer";

export function AddUsersDialog({
  state,
  setState,
  title,
}: SingleDialogContainerProps) {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<CreateUserDTO>({} as CreateUserDTO);
  const { mutate, isLoading } = useMutation(SecurityServiceQuery.createUser);

  const handleAddUser = () => {
    mutate(user, {
      onSuccess: () => {
        Notify("Usuário criado com sucesso!", "bottom-left", "success");
        queryClient.invalidateQueries("getUsers");
      },
      onError: () => {
        Notify(`Erro ao cadastrar o usuário!}`, "bottom-left", "error");
      },
    });
    setState(false);
  };

  const handleCloseDialog = () => {
    setState(false);
  };

  return (
    <SingleDialogContainer state={state} setState={setState} title={title}>
      <TextField
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        required
        label="Nome do Usuário"
        fullWidth
      />
      <TextField
        sx={{ mt: 2 }}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        required
        label="Email do Usuário"
        fullWidth
      />
      <TextField
        type="password"
        sx={{ mt: 2 }}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        required
        label="Senha do Usuário"
        fullWidth
      />
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
      >
        <Grid item display="flex">
          <Button onClick={handleCloseDialog} color="error" variant="contained">
            Cancelar
          </Button>
        </Grid>
        <Grid item display="flex">
          <Button
            disabled={isLoading}
            onClick={handleAddUser}
            color="success"
            variant="contained"
          >
            {isLoading ? (
              <CircularProgress size={12} />
            ) : (
              <Typography>Confirmar</Typography>
            )}
          </Button>
        </Grid>
      </Grid>
    </SingleDialogContainer>
  );
}
