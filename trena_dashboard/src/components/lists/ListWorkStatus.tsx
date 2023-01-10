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
import { WorkStatus } from "../../core/models/WorkStatus";
import { WorkStatusServiceQuery } from "../../core/network/services/WorkStatusService";
import { AddWorkStatusDialog } from "../Dialogs/StatusWork/AddWorkStatusDialog";
import { EditWorkStatusDialog } from "../Dialogs/StatusWork/EditWorkStatusDialog";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";

export const ListWorkStatus = observer(() => {
  const { data: workStatus, isLoading } = useQuery<WorkStatus[]>(
    ["getWorkStatus"],
    WorkStatusServiceQuery.loadWorkStatus,
    {
      onSuccess: (data) => {
        setOpenEditWorkStatusDialog(Array(data.length).fill(false));
        setAtualTable(data);
      },
    }
  );
  const [addWorkStatusDialog, setOpenAddWorkStatusDialog] = useState(false);
  const [editWorkStatusDialog, setOpenEditWorkStatusDialog] = useState<
    boolean[]
  >([]);
  const [atualTable, setAtualTable] = useState<WorkStatus[]>(workStatus!);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSearch = (value?: string) => {
    if (value) {
      setAtualTable(
        workStatus!.filter((workstatus) =>
          workstatus.name.toLocaleUpperCase().includes(value.toUpperCase())
        )
      );
    } else {
      setAtualTable(workStatus!);
    }
  };

  const handleDeleteWorkStatus = (workStatus: WorkStatus) => {};

  const handleOpenEditDialog = (index: number) => {
    setOpenEditWorkStatusDialog(
      editWorkStatusDialog.map((value, position) =>
        position === index ? true : value
      )
    );
  };

  return (
    <>
      {isLoading || !workStatus ? (
        <LoadingTableData
          headingAction={() => setOpenAddWorkStatusDialog(true)}
          headingTitle="Estado das Obras"
          headingButtonTitle="Adicionar Estado de Obra"
          headingSteps={[
            { title: "Dashboard", url: "/" },
            { title: "Estado das Obras", url: "/" },
          ]}
        />
      ) : (
        <Grid style={{ width: "100%", marginTop: 14 }} item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Heading
              buttonTitle="Adicionar Estado de Obra"
              title="Estado das Obras"
              steps={[
                { title: "Dashboard", url: "/" },
                { title: "Estado das Obras", url: "/" },
              ]}
              handleAction={() => setOpenAddWorkStatusDialog(true)}
            >
              <AddWorkStatusDialog
                state={addWorkStatusDialog}
                setState={setOpenAddWorkStatusDialog}
                title="Adicionar Estado De Obra"
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
                    <TableCell align="center">Decrição</TableCell>
                    <TableCell align="center">Editar</TableCell>
                    <TableCell align="center">Remover</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {atualTable
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((workStatus: WorkStatus, index: number) => (
                      <TableRow hover key={workStatus.flag}>
                        <TableCell align="center">{workStatus.name}</TableCell>
                        <TableCell align="center">
                          {workStatus.description}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="warning"
                            onClick={() => handleOpenEditDialog(index)}
                          >
                            <Edit />
                          </IconButton>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => handleDeleteWorkStatus(workStatus)}
                            color="error"
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                        <EditWorkStatusDialog
                          state={editWorkStatusDialog}
                          setState={setOpenEditWorkStatusDialog}
                          workStatus={workStatus}
                          index={index}
                          title="Editar Estado Da Obra"
                        />
                      </TableRow>
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
