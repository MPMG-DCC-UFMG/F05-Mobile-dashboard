import { observer } from "mobx-react";
import React, { useState } from "react";

import { Details, Edit } from "@material-ui/icons";
import { Delete, Map } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import { useMutation, useQuery } from "react-query";
import { Address } from "../../core/models/Address";
import {
  PublicWorkService,
  PublicWorkServiceQuery,
} from "../../core/network/services/PublicWorkService";
import { MapDialog } from "../Dialogs/MapDialog";
import { AddPublicWorkDialog } from "../Dialogs/PublicWork/AddPublicWorkDialog";
import { PublicWorkInspectionsDialog } from "../Dialogs/PublicWork/PublicWorkInspectionsDialog";
import { Heading } from "../Heading";
import { TablePagination } from "../TablePagination";

export const ListPublicWork = observer(() => {
  const { data: publicWorks, isLoading } = useQuery(
    "getPublicWorks",
    () => PublicWorkService.loadPublicWorks(),
    {
      onSuccess: (data) => {
        setOpenInspectionsModal(Array(data.length).fill(false));
        setOpenLocalizationModal(Array(data.length).fill(false));
      },
    }
  );
  const [openActionDialog, setOpenActionDialog] = useState(false);
  const [openAddPublicWorkDialog, setOpenAddPublicWorkDialog] = useState(false);
  const [openLocalizationModal, setOpenLocalizationModal] = useState<boolean[]>(
    []
  );
  const [openInspectionsModal, setOpenInspectionsModal] = useState<boolean[]>(
    []
  );

  // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const query = event.currentTarget.value;
  //   publicWorkStore.search(query);
  // };

  // const handleAddClick = () => {
  //   let mPublicWork = {} as PublicWork;
  //   createPublicWork(
  //     "Adicionar obra pública",
  //     "Adicionar",
  //     () => {
  //       publicWorkStore.addPublicWork(mPublicWork);
  //     },
  //     (publicWork: PublicWork) => {
  //       mPublicWork = publicWork;
  //     }
  //   );
  // };

  // const handleEditClick = () => {
  //   if (publicWorkStore.selectedPublicWork !== undefined) {
  //     let mPublicWork = publicWorkStore.selectedPublicWork;
  //     createPublicWork(
  //       "Editar obra pública",
  //       "Editar",
  //       () => {
  //         publicWorkStore.updatePublicWork(mPublicWork);
  //       },
  //       (publicWork: PublicWork) => {
  //         mPublicWork = publicWork;
  //       },
  //       mPublicWork
  //     );
  //   }
  // };

  // const createPublicWork = (
  //   title: string,
  //   confirm: string,
  //   onConfirmClick: () => void,
  //   onChangePublicWork: (publicWork: PublicWork) => void,
  //   defaultPublicWork?: PublicWork
  // ) => {
  //   let publicWorkView = {
  //     title: title,
  //     confirmButton: confirm,
  //     onConfirmClick: onConfirmClick,
  //     contentView: (
  //       <PublicWorkCRUDView
  //         onChangePublicWork={onChangePublicWork}
  //         defaultPublicWork={defaultPublicWork}
  //         typeOfWorkList={typeWorks}
  //       />
  //     ),
  //   };
  //   viewStore.setViewInModal(publicWorkView);
  // };

  // const handleDeleteClick = () => {
  //   if (publicWorkStore.selectedPublicWork !== undefined) {
  //     const publicWork = publicWorkStore.selectedPublicWork;
  //     let deleteView = {
  //       title: "Deletar obra pública",
  //       confirmButton: "Deletar",
  //       onConfirmClick: () => {
  //         if (publicWork.id) {
  //           publicWorkStore.deletePublicWork(publicWork.id);
  //         }
  //       },
  //       contentView: <DeleteView toDelete={publicWork.name} />,
  //     };
  //     viewStore.setViewInModal(deleteView);
  //   }
  // };

  const handleOpenLocalizationModal = (index: number) =>
    setOpenLocalizationModal(
      openInspectionsModal.map((value, pos) => (index === pos ? true : value))
    );
  const handleOpenInspectionsModal = (index: number) =>
    setOpenInspectionsModal(
      openInspectionsModal.map((value, pos) => (index === pos ? true : value))
    );

  const addressFormatter = (adress: Address) =>
    `${adress.street}, ${adress.number} - ${adress.city}`;

  if (isLoading) {
    return (
      <Grid style={{ width: "100%", marginTop: 14 }} item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Heading
            buttonTitle="Adicionar Obra Pública"
            title="Obras Públicas"
            steps={[
              { title: "Dashboard", url: "/" },
              { title: "Obras Públicas", url: "/" },
            ]}
            handleAction={() => setOpenAddPublicWorkDialog(true)}
          >
            <Box width="100%">
              <LinearProgress />
            </Box>
          </Heading>
        </Paper>
      </Grid>
    );
  }

  if (!publicWorks) {
    return <h1>Is loading...</h1>;
  }

  const deletePublicWorkMutation = (publicWorkId: string) =>
    useMutation(PublicWorkServiceQuery.deletePublicWork).mutate(publicWorkId);

  return (
    <>
      <Grid style={{ width: "100%", marginTop: 14 }} item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Heading
            buttonTitle="Adicionar Obra Pública"
            title="Obras Públicas"
            steps={[
              { title: "Dashboard", url: "/" },
              { title: "Obras Públicas", url: "/" },
            ]}
            handleAction={() => setOpenAddPublicWorkDialog(true)}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Endereço</TableCell>
                  <TableCell align="center">Localização</TableCell>
                  <TableCell align="center">Vistorias</TableCell>
                  <TableCell align="center">Editar</TableCell>
                  <TableCell align="center">Deletar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {publicWorks.map((publicWork, index) => (
                  <TableRow key={publicWork.id}>
                    <TableCell align="center">{publicWork.id}</TableCell>
                    <TableCell align="center">{publicWork.name}</TableCell>
                    <TableCell align="center">
                      {addressFormatter(publicWork.address)}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Mapa">
                        <IconButton
                          onClick={() => handleOpenLocalizationModal(index)}
                        >
                          <Map htmlColor="#76BA99" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Vistorias">
                        <IconButton
                          onClick={() => handleOpenInspectionsModal(index)}
                        >
                          <Details htmlColor="#03a9f4" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Editar">
                        <IconButton>
                          <Edit htmlColor="#03a9f4" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Deletar">
                        <IconButton
                          onClick={() =>
                            deletePublicWorkMutation(publicWork.id)
                          }
                        >
                          <Delete color="error" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <MapDialog
                      state={openLocalizationModal}
                      setState={setOpenLocalizationModal}
                      publicWork={publicWork}
                      index={index}
                    />
                    <PublicWorkInspectionsDialog
                      state={openInspectionsModal}
                      setState={setOpenInspectionsModal}
                      publicWorkId={publicWork.id}
                      index={index}
                      title={`Vistorias: ${publicWork.name}`}
                    />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination data={publicWorks} />
            <AddPublicWorkDialog
              state={openAddPublicWorkDialog}
              setState={setOpenAddPublicWorkDialog}
              title="Nova Obra Pública"
            />
          </Heading>
        </Paper>
      </Grid>
    </>
  );
});
