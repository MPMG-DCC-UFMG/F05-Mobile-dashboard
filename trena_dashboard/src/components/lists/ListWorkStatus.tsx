import { Delete, Edit, Visibility } from "@mui/icons-material";
import {
  Divider,
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
import { WorkStatus } from "../../core/models/WorkStatus";
import { WorkStatusServiceQuery } from "../../core/network/services/WorkStatusService";
import { AddWorkStatusDialog } from "../Dialogs/StatusWork/AddWorkStatusDialog";
import { EditWorkStatusDialog } from "../Dialogs/StatusWork/EditWorkStatusDialog";
import { Search } from "../Form/Search";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";

export const ListWorkStatus = observer(() => {
  const { data: workStatus, isLoading } = useQuery(
    ["getWorkStatus"],
    WorkStatusServiceQuery.loadWorkStatus,
    {
      onSuccess: (data) => {
        setOpenEditWorkStatusDialog(Array(data.length).fill(false));
        setAtualTable(workStatusStore.workStatusList);
      }
    }
  );
   const { workStatusStore} = useStores();
  const [addWorkStatusDialog, setOpenAddWorkStatusDialog] = useState(false);
  const [editWorkStatusDialog, setOpenEditWorkStatusDialog] = useState<boolean[]>([]);
  const [atualTable, setAtualTable] = useState<WorkStatus[]>(workStatusStore.workStatusList);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
 

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value;
    workStatusStore.search(query);
    setAtualTable(workStatusStore.workStatusList);
  };

  const handleDeleteWorkStatus = (workStatus: WorkStatus) => {
    if (workStatus.flag) {
      workStatusStore.deleteWorkStatus(workStatus.flag);
    }
  };

  const handleOpenEditDialog = (index: number) => {
    setOpenEditWorkStatusDialog(editWorkStatusDialog.map((value, position) => 
      (position === index ? true : value)
    ))
  }

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
                <Search label="Estado da Obra" onTextChanged={handleSearch} />
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
                  {workStatus!
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((workStatus: WorkStatus, index: number) => (
                    <TableRow hover key={workStatus.flag}>
                      <TableCell align="center">{workStatus.name}</TableCell>
                      {/* <TableCell align="center">
                        <IconButton>
                          <Visibility />
                        </IconButton>
                      </TableCell> */}
                      <TableCell align="center">
                        {workStatus.description}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton color="info" onClick={()=> handleOpenEditDialog(index)}>
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
                        title='Editar Estado Da Obra'
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
                data={workStatus} />
            </Heading>
          </Paper>
        </Grid>
      )}
    </>
  );
});
