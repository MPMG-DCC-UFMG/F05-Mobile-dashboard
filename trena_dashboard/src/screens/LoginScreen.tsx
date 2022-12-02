import { Button, TextField, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { AsideLoginContainer } from "../components/Containers/AsideLoginContainer";
import { WarningField } from "../components/WarningField";
import { SecurityServiceQuery } from "../core/network/services/SecurityService";
import { theme } from "../utils/theme";

type LoginUser = {
  username: string;
  password: string;
};

export function LoginScreen() {
  const navigate = useNavigate();
  const [user, setUser] = useState<LoginUser>({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    hasError: false,
    message: "",
  });

  const { refetch } = useQuery(
    "login",
    () => SecurityServiceQuery.login(user.username, user.password),
    {
      enabled: false,
      onSuccess: () => navigate("/dashboard"),
      onError(err) {
        setError({
          hasError: true,
          message:
            "Este usuário não possui acesso ao Painel ou as credenciais estão incorretas",
        });
      },
    }
  );

  const onLoginClicked = async () => {
    refetch();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginClicked();
  };

  return (
    <ThemeProvider theme={theme}>
    <AsideLoginContainer>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        type="email"
        autoFocus
        defaultValue={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        type="password"
        label="Senha"
        id="password"
        autoComplete="current-password"
        defaultValue={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <Button
        fullWidth
        onClick={onSubmit}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Entrar
      </Button>
      <>
        {error.hasError && (
          <WarningField
            title="Falha ao verificar credenciais"
            severity="error"
            message={error.message}
          />
        )}
      </>
    </AsideLoginContainer>
    </ThemeProvider>
  );
}
