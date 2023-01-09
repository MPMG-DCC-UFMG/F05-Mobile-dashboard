import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { AsideLoginContainer } from "../components/Containers/AsideLoginContainer";
import { WarningField } from "../components/WarningField";
import { rootContext } from "../core/contexts/RootContext";
import { SecurityServiceQuery } from "../core/network/services/SecurityService";

export type LoginUser = {
  username: string;
  password: string;
};

export function LoginScreen() {
  const navigate = useNavigate();
  const { userStore } = useContext(rootContext);
  const defaultUsername = import.meta.env.VITE_ADMIN_USERNAME;
  const defaultPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  const [user, setUser] = useState<LoginUser>({
    username: defaultUsername || "",
    password: defaultPassword || "",
  });
  const [error, setError] = useState({
    hasError: false,
    message: "",
  });

  const { mutate, isLoading } = useMutation(SecurityServiceQuery.login);

  const handleLogin = () => {
    mutate(user, {
      onSuccess: (data) => {
        userStore.updateLoggedUser({
          email: data.email,
          role: data.role,
          name: "",
        });
        navigate("/dashboard");
      },
      onError: () => {
        setError({
          hasError: true,
          message:
            "Este usuário não possui acesso ao Painel ou as credenciais estão incorretas",
        });
      },
    });
  };

  return (
    <AsideLoginContainer>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        type="email"
        autoFocus
        value={user.username}
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
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <Button
        fullWidth
        onClick={handleLogin}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        {isLoading ? <CircularProgress size={20} color="inherit" /> : "Entrar"}
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
  );
}
