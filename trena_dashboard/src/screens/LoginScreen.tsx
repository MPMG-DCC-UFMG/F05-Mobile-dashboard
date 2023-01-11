import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { AsideLoginContainer } from "../components/Containers/AsideLoginContainer";
import { useLogin } from "../core/network/queries/auth/mutations";

export type LoginUser = {
  username: string;
  password: string;
};

export function LoginScreen() {
  const defaultUsername = import.meta.env.VITE_ADMIN_USERNAME;
  const defaultPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  const { mutate, isLoading } = useLogin();

  const [user, setUser] = useState<LoginUser>({
    username: defaultUsername || "",
    password: defaultPassword || "",
  });

  const handleLogin = () => {
    mutate(user);
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
    </AsideLoginContainer>
  );
}
