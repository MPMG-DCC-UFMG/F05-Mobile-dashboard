import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react";
import React from "react";
import { useStores } from "../../core/contexts/UseStores";

export const ListUser = observer(() => {
  const { userStore } = useStores();

  const handleUserDeleted = (username: string) => {
    userStore.deleteUser(username);
  };

  return (
    <Grid>
      <Paper
        sx={{
          flexDirection: "column",
        }}
      >
        <Grid item display="flex" justifyContent="space-between" padding={3}>
          <Typography variant="h6">Usuários</Typography>
          <Button color="info" variant="contained" startIcon={<Add />}>
            Novo Usuário
          </Button>
        </Grid>
        <Divider />
        <Grid item display="flex">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Função</TableCell>
                  <TableCell align="center">Detalhes</TableCell>
                  <TableCell align="center">Editar</TableCell>
                  <TableCell align="center">Remover</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userStore.usersList.map((user) => (
                  <TableRow hover>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.role}</TableCell>
                    <TableCell align="center" key={user.email}>
                      <IconButton>
                        <Visibility />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center" key={user.email}>
                      <IconButton color="info">
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center" key={user.email}>
                      <IconButton color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Paper>
    </Grid>
  );
});
