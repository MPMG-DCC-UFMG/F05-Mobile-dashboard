import { Delete, Edit, Visibility } from "@mui/icons-material";
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useStores } from "../../core/contexts/UseStores";
import { SecurityServiceQuery } from "../../core/network/services/SecurityService";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";

export const ListUser = observer(() => {
  const { userStore } = useStores();
  const { data: users, isLoading } = useQuery(
    "getUsers",
    SecurityServiceQuery.loadUsersList
  );
  const [addUserDialog, setOpenAddUserDialog] = useState(false);

  const handleUserDeleted = (username: string) => {
    userStore.deleteUser(username);
  };

  return (
    <>
      {isLoading || !users ? (
        <LoadingTableData
          headingAction={() => setOpenAddUserDialog(true)}
          headingButtonTitle="Adicionar Usuário"
          headingTitle="Usuários"
          headingSteps={[
            { title: "Dashboard", url: "/" },
            { title: "Usuários", url: "/" },
          ]}
        />
      ) : (
        <Grid style={{ width: "100%", marginTop: 14 }} item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Heading
              buttonTitle="Adicionar Usuário"
              title="Usuários"
              steps={[
                { title: "Dashboard", url: "/" },
                { title: "Usuários", url: "/" },
              ]}
              handleAction={() => setOpenAddUserDialog(true)}
            >
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
              <TablePagination data={users!} />
            </Heading>
          </Paper>
        </Grid>
      )}
    </>
  );
});
