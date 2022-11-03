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
import { TypePhoto } from "../../core/models/TypePhoto";
import { WorkStatus } from "../../core/models/WorkStatus";
import { WorkStatusServiceQuery } from "../../core/network/services/WorkStatusService";
import { DeleteView } from "../../screens/views/DeleteView";
import WorkStatusCRUDView from "../../screens/views/workStatus/WorkStatusCRUDView";
import { AddWorkStatusDialog } from "../Dialogs/StatusWork/AddWorkStatusDialog";
import { Search } from "../Form/Search";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";

export const ListWorkStatus = observer(() => {
  const { data: workStatus, isLoading } = useQuery<WorkStatus[]>(
    "getWorkStatus",
    WorkStatusServiceQuery.loadWorkStatus
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

  const handleDeleteWorkStatus = (workStatus: WorkStatus) => {
    if (workStatus.flag) {
      workStatusStore.deleteWorkStatus(workStatus.flag);
    }
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
                  {workStatus.map((workStatus) => (
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
                        <IconButton color="info">
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination data={workStatus} />
            </Heading>
          </Paper>
        </Grid>
      )}
    </>
  );
});
