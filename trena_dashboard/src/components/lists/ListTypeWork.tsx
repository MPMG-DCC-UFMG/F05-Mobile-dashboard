import {
  Grid,
  Paper,
  Table,
  TableRow,
  Divider,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  LinearProgress,
  Box,
} from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { TablePagination } from "../TablePagination";
import { useQuery } from "react-query";
import { useStores } from "../../core/contexts/UseStores";
import { TypeWork } from "../../core/models/TypeWork";
import { TypeWorkService } from "../../core/network/services/TypeWorkService";
import React from "react";
import { Search } from "../Form/Search";
import { Heading } from "../Heading";
import { AddTypeOfWorkDialog } from "../Dialogs/TypeOfWork/AddTypeOfWorkDialog";
import { useState } from "react";
import { observer } from "mobx-react";

export const ListTypeWork = observer(() => {
  const { data: typeWorks, isLoading } = useQuery("getTypeWork", () =>
    TypeWorkService.loadTypeWorks()
  );

  const { typeWorkStore, viewStore, typePhotoStore } = useStores();
  const [addTypeWorkDialog, setOpenAddTypeWorkDialog] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value;
    typeWorkStore.search(query);
  };

  const handleDeleteTypeWork = (typeWork: TypeWork) => {
    if (typeWork.flag) {
      typeWorkStore.deleteTypeOfWork(typeWork.flag);
    }
  };

  if (isLoading) {
    return (
      <Grid style={{ width: "100%", marginTop: 14 }} item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Heading
            buttonTitle="Adicionar Tipo de Obra"
            title="Tipos de Obra"
            steps={[
              { title: "Dashboard", url: "/" },
              { title: "Tipos de Obra", url: "/" },
            ]}
            handleAction={() => setOpenAddTypeWorkDialog(true)}
          >
            <Box width="100%">
              <LinearProgress />
            </Box>
          </Heading>
        </Paper>
      </Grid>
    );
  }

  if (!typeWorks) {
    return <h1>Is loading...</h1>;
  }

  return (
    <>
      <Grid style={{ width: "100%", marginTop: 14 }} item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Heading
            buttonTitle="Adicionar Tipo de Obra"
            title="Tipos de Obras"
            steps={[
              { title: "Dashboard", url: "/" },
              { title: "Tipos de Obras", url: "/" },
            ]}
            handleAction={() => setOpenAddTypeWorkDialog(true)}
          >
            <AddTypeOfWorkDialog 
              state ={addTypeWorkDialog} 
              setState={setOpenAddTypeWorkDialog}
              title='Adicionar Tipo De Obra'
            />
          <Grid item display="flex" padding={2} justifyContent="flex-Start">
            <Search label="Tipo de Obra" onTextChanged={handleSearch} />
          </Grid>
          <Divider />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">Detalhes</TableCell>
                <TableCell align="center">Editar</TableCell>
                <TableCell align="center">Remover</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {typeWorkStore.typeWorksList.map((typeWork) => (
                <TableRow hover>
                  <TableCell align="center">{typeWork.name}</TableCell>
                  <TableCell align="center" key={typeWork.flag}>
                    <IconButton>
                      <Visibility />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center" key={typeWork.flag}>
                    <IconButton color="info">
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center" key={typeWork.flag}>
                    <IconButton
                      onClick={() => handleDeleteTypeWork(typeWork)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination data={typeWorks} />
          </Heading>
        </Paper>
      </Grid>
    </>
  );
});
