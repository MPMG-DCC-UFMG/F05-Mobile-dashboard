import { Add, Visibility, Edit, Delete } from "@mui/icons-material";
import {
  Grid,
  Paper,
  Typography,
  Divider,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Table,
  Box,
  LinearProgress,
} from "@mui/material";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useStores } from "../../core/contexts/UseStores";
import { TypePhoto } from "../../core/models/TypePhoto";
import { WorkStatus } from "../../core/models/WorkStatus";
import { WorkStatusService } from "../../core/network/services/WorkStatusService";
import { DeleteView } from "../../screens/views/DeleteView";
import WorkStatusCRUDView from "../../screens/views/workStatus/WorkStatusCRUDView";
import { Search } from "../Form/Search";
import { Heading } from "../Heading";
import { TablePagination } from "../TablePagination";

export const ListWorkStatus = observer(() => {
  const { data: workStatus, isLoading } = useQuery("getWorkStatus", () =>
    WorkStatusService.loadWorkStatus()
  );
  const [addWorkStatusDialog, setOpenAddWorkStatusDialog] = useState(false);
  const { workStatusStore, viewStore } = useStores();

  const createWorkStatusView = (
    title: string,
    confirm: string,
    onConfirmClick: () => void,
    onChangeWorkStatus: (workStatus: WorkStatus) => void,
    defaultWorkStatus?: WorkStatus
  ) => {
    let workStatusView = {
      title: title,
      confirmButton: confirm,
      onConfirmClick: onConfirmClick,
      contentView: (
        <WorkStatusCRUDView
          onChangeWorkStatus={onChangeWorkStatus}
          defaultWorkStatus={defaultWorkStatus}
        />
      ),
    };
    viewStore.setViewInModal(workStatusView);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value;
    workStatusStore.search(query);
  };

  const handleAddClick = () => {
    let mWorkStatus: WorkStatus = { name: "", description: "" };
    createWorkStatusView(
      "Adicionar estado da obra",
      "Adicionar",
      () => {
        workStatusStore.addWorkStatus(mWorkStatus);
      },
      (typePhoto: TypePhoto) => {
        mWorkStatus = typePhoto;
      }
    );
  };

  const handleEditClick = () => {
    if (workStatusStore.selectedWorkStatus) {
      let mWorkStatus = workStatusStore.selectedWorkStatus;
      createWorkStatusView(
        "Editar possível estado da obra",
        "Editar",
        () => {
          workStatusStore.updateWorkStatus(mWorkStatus);
        },
        (workStatus: WorkStatus) => {
          mWorkStatus = workStatus;
        },
        mWorkStatus
      );
    }
  };

  const handleDeleteClick = () => {
    if (workStatusStore.selectedWorkStatus !== undefined) {
      const mWorkStatus = workStatusStore.selectedWorkStatus;
      let deleteView = {
        title: "Deletar tipo de foto",
        confirmButton: "Deletar",
        onConfirmClick: () => {
          if (mWorkStatus.flag) {
            workStatusStore.deleteWorkStatus(mWorkStatus.flag);
          }
        },
        contentView: <DeleteView toDelete={mWorkStatus.name} />,
      };
      viewStore.setViewInModal(deleteView);
    }
  };

  if (isLoading) {
    return (
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
            <Box width="100%">
              <LinearProgress />
            </Box>
          </Heading>
        </Paper>
      </Grid>
    );
  }

  if (!workStatus) {
    return <h1>Is loading...</h1>;
  }

  return (
    <>
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
                {workStatusStore.workStatusList.map((workStatus) => (
                  <TableRow hover>
                    <TableCell align="center">{workStatus.name}</TableCell>
                    <TableCell align="center" key={workStatus.flag}>
                      <IconButton>
                        <Visibility />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center" key={workStatus.flag}>
                      <IconButton color="info">
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center" key={workStatus.flag}>
                      <IconButton color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination data={workStatus}/>
          </Heading>
        </Paper>
      </Grid>
    </>
  );
});
