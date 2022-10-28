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
} from "@mui/material";
import { observer } from "mobx-react";
import React from "react";
import { useStores } from "../../core/contexts/UseStores";
import { TypePhoto } from "../../core/models/TypePhoto";
import { WorkStatus } from "../../core/models/WorkStatus";
import { DeleteView } from "../../screens/views/DeleteView";
import WorkStatusCRUDView from "../../screens/views/workStatus/WorkStatusCRUDView";
import { Search } from "../Form/Search";

export const ListWorkStatus = observer(() => {
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

  return (
    <Grid>
      <Paper
        sx={{
          flexDirection: "column",
        }}
      >
        <Grid item display="flex" justifyContent="space-between" padding={3}>
          <Typography variant="h6">Estados das Obras</Typography>
          <Button color="info" variant="contained" startIcon={<Add />}>
            Estados da Obra
          </Button>
        </Grid>
        <Divider />
        <Grid item display="flex" padding={2} justifyContent="flex-Start">
          <Search label="Estado da Obra" onTextChanged={handleSearch} />
        </Grid>
        <Divider />
        <Grid item display="flex">
          <TableContainer>
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
          </TableContainer>
        </Grid>
      </Paper>
    </Grid>
  );
});
