import { Delete, Edit, ManageSearch } from "@mui/icons-material";
import {
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useStores } from "../../core/contexts/UseStores";
import { TypeWork } from "../../core/models/TypeWork";
import { TypeWorkServiceQuery } from "../../core/network/services/TypeWorkService";
import { ConfirmActionDialog } from "../Dialogs/ConfirmActionDialog";
import { AddTypeOfWorkDialog } from "../Dialogs/TypeOfWork/AddTypeOfWorkDialog";
import { EditTypeOfWorkDialog } from "../Dialogs/TypeOfWork/EditTypeOfWorkDialog";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";

export const ListTypeWork = observer(() => {
  const { data: typeWorks, isLoading } = useQuery<TypeWork[]>(
    ["getTypeWork"],
    () => TypeWorkServiceQuery.loadTypeWorks(),
    {
      onSuccess: (data) => {
        setOpenEditTypeWorkDialog(Array(data.length).fill(false));
        setOpenDeleteDialog(Array(data.length).fill(false));
        setAtualTable(data);
      },
    }
  );
  const { typeWorkStore } = useStores();
  const [addTypeWorkDialog, setOpenAddTypeWorkDialog] = useState(false);
  const [editTypeWorkDialog, setOpenEditTypeWorkDialog] = useState<boolean[]>(
    []
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean[]>([]);
  const [atualTable, setAtualTable] = useState<TypeWork[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSearch = (value?: string) => {
    if (value) {
      setAtualTable(
        typeWorks!.filter((item) =>
          item.name.toUpperCase().includes(value.toUpperCase())
        )
      );
    } else {
      setAtualTable(typeWorks!);
    }
  };

  const handleDeleteTypeWork = (typeWork: TypeWork) => {
    if (typeWork.flag) {
      typeWorkStore.deleteTypeOfWork(typeWork.flag);
    }
  };

  const handleOpenEditDialog = (index: number) => {
    setOpenEditTypeWorkDialog(
      editTypeWorkDialog.map((value, position) =>
        index === position ? true : value
      )
    );
  };

  const handleOpenDeleteDialog = (index: number) => {
    setOpenDeleteDialog(
      openDeleteDialog.map((value, position) =>
        index === position ? true : value
      )
    );
  };

  return (
    <>
      {isLoading || !typeWorks ? (
        <LoadingTableData
          headingAction={() => setOpenAddTypeWorkDialog(true)}
          headingTitle="Tipos de Obras"
          headingButtonTitle="Adicionar Tipo de Obra"
          headingSteps={[
            { title: "Dashboard", url: "/" },
            { title: "Tipos de Obras", url: "/" },
          ]}
        />
      ) : (
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
                state={addTypeWorkDialog}
                setState={setOpenAddTypeWorkDialog}
                title="Adicionar Tipo De Obra"
              />
              <Grid item display="flex" padding={2} justifyContent="flex-Start">
                <TextField
                  fullWidth
                  size="small"
                  onChange={(e) => handleSearch(e.target.value)}
                  label="Tipo de Obra"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ManageSearch />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Divider />
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Nome</TableCell>
                    <TableCell align="center">Editar</TableCell>
                    <TableCell align="center">Remover</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {atualTable
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((typeWork: TypeWork, index: number) => (
                      <React.Fragment key={typeWork.flag!}>
                        <TableRow hover>
                          <TableCell align="center">{typeWork.name}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              color="secondary"
                              style={{ backgroundColor: "#73ff00" }}
                              size="small"
                              onClick={() => handleOpenEditDialog(index)}
                            >
                              <Edit />
                            </IconButton>
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteTypeWork(typeWork)}
                              color="secondary"
                              style={{ backgroundColor: "#73ff00" }}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                          <EditTypeOfWorkDialog
                            state={editTypeWorkDialog}
                            setState={setOpenEditTypeWorkDialog}
                            typeWork={typeWork}
                            index={index}
                            title="Editar Tipo de Obra"
                          />
                          <ConfirmActionDialog
                            message="Confirmar Exclusão"
                            action={() => handleDeleteTypeWork(typeWork)}
                            state={openDeleteDialog}
                            setState={() => setOpenDeleteDialog}
                          />
                        </TableRow>
                      </React.Fragment>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                page={page}
                setPage={setPage}
                data={atualTable}
              />
            </Heading>
          </Paper>
        </Grid>
      )}
    </>
  );
});
