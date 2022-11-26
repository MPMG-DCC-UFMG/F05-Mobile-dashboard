import { observer } from "mobx-react";
import React, { useState } from "react";

import { AddAPhoto, Edit } from "@material-ui/icons";
import { Delete, LocalSee, Map } from "@mui/icons-material";
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { useQuery } from "react-query";
import { Address } from "../../core/models/Address";
import { PublicWork } from "../../core/models/PublicWork";
import { PublicWorkServiceQuery } from "../../core/network/services/PublicWorkService";
import { DelegateInspectionDialog } from "../Dialogs/Inspection/DelegateInspection";
import { MapDialog } from "../Dialogs/MapDialog";
import { AddPublicWorkDialog } from "../Dialogs/PublicWork/AddPublicWorkDialog";
import { HandlePublicWorkDialog } from "../Dialogs/PublicWork/HandlePublicWorkDialog";
import { PublicWorkInspectionsDialog } from "../Dialogs/PublicWork/PublicWorkInspectionsDialog";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";

export const ListPublicWork = observer(() => {
  const { data: publicWorks, isLoading } = useQuery(
    ["getPublicWorks"],
    PublicWorkServiceQuery.loadPublicWorks,
    {
      onSuccess: (data) => {
        setOpenInspectionsModal(Array(data.length).fill(false));
        setOpenLocalizationModal(Array(data.length).fill(false));
        setOpenActionDialog(Array(data.length).fill(false));
        setOpenAddInspectionModal(Array(data.length).fill(false));
      },
    }
  );
  const [openActionDialog, setOpenActionDialog] = useState<boolean[]>([]);
  const [openAddPublicWorkDialog, setOpenAddPublicWorkDialog] = useState(false);
  const [openLocalizationModal, setOpenLocalizationModal] = useState<boolean[]>(
    []
  );
  const [openInspectionsModal, setOpenInspectionsModal] = useState<boolean[]>(
    []
  );
  const [openAddInspectionModal, setOpenAddInspectionModal] = useState<
    boolean[]
  >([]);
  const [actionMode, setActionMode] = useState<"edit" | "delete">("edit");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleOpenLocalizationModal = (index: number) =>
    setOpenLocalizationModal(
      openInspectionsModal.map((value, pos) => (index === pos ? true : value))
    );
  const handleOpenInspectionsModal = (index: number) =>
    setOpenInspectionsModal(
      openInspectionsModal.map((value, pos) => (index === pos ? true : value))
    );

  const handleOpenAddInspectionModal = (index: number) =>
    setOpenAddInspectionModal(
      openAddInspectionModal.map((value, pos) => (index === pos ? true : value))
    );

  const handleOpenActionModal = (index: number, mode: "edit" | "delete") => {
    setActionMode(mode);
    setOpenActionDialog(
      openActionDialog.map((value, pos) => (index === pos ? true : value))
    );
  };

  const addressFormatter = (adress: Address) =>
    `${adress.street}, ${adress.number} - ${adress.city}`;

  return (
    <>
      {isLoading || !publicWorks ? (
        <LoadingTableData
          headingButtonTitle="Adicionar Obra Pública"
          headingTitle="Obras Públicas"
          headingAction={() => setOpenAddPublicWorkDialog(true)}
          headingSteps={[
            { title: "Dashboard", url: "/" },
            { title: "Obras Públicas", url: "/" },
          ]}
        />
      ) : (
        <Grid style={{ width: "100%", marginTop: 14 }} item>
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
                    <TableCell align="center">Nome</TableCell>
                    <TableCell align="center">Endereço</TableCell>
                    <TableCell align="center">Localização</TableCell>
                    <TableCell align="center">Vistorias</TableCell>
                    <TableCell align="center">Nova Vistoria</TableCell>
                    <TableCell align="center">Editar</TableCell>
                    <TableCell align="center">Deletar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {publicWorks!
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((publicWork: PublicWork, index: number) => (
                      <TableRow key={publicWork.id}>
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
                              <LocalSee htmlColor="#03a9f4" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Adicionar Vistoria">
                            <IconButton
                              onClick={() =>
                                handleOpenAddInspectionModal(index)
                              }
                            >
                              <AddAPhoto htmlColor="#03A9F4" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Editar">
                            <IconButton
                              onClick={() =>
                                handleOpenActionModal(index, "edit")
                              }
                            >
                              <Edit htmlColor="#03a9f4" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Deletar">
                            <IconButton
                              onClick={() =>
                                handleOpenActionModal(index, "delete")
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
                          fullScreen
                        />
                        <PublicWorkInspectionsDialog
                          state={openInspectionsModal}
                          setState={setOpenInspectionsModal}
                          publicWorkId={publicWork.id}
                          index={index}
                          title={`Vistorias: ${publicWork.name}`}
                        />
                        <HandlePublicWorkDialog
                          state={openActionDialog}
                          setState={setOpenActionDialog}
                          index={index}
                          mode={actionMode}
                          publicWork={publicWork}
                          title={
                            actionMode === "edit"
                              ? "Editar Obra Pública"
                              : "Deletar Obra Pública"
                          }
                          fullScreen
                        />
                        <DelegateInspectionDialog
                          index={index}
                          publicWork={publicWork}
                          state={openAddInspectionModal}
                          setState={setOpenAddInspectionModal}
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
                data={publicWorks!}
              />
              <AddPublicWorkDialog
                state={openAddPublicWorkDialog}
                setState={setOpenAddPublicWorkDialog}
                title="Nova Obra Pública"
                fullScreen={true}
              />
            </Heading>
          </Paper>
        </Grid>
      )}
    </>
  );
});
