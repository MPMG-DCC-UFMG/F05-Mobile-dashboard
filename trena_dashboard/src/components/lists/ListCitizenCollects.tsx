import { Collections, Delete } from "@mui/icons-material";
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
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Collect } from "../../core/models/Collect";
import { CollectServiceQuery } from "../../core/network/services/CollectService";
import { collectStatusMapping, convertEphocDate } from "../../utils/mapper";
import { CollectSubmissionDialog } from "../Dialogs/Collect/CollectSubmission";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";

export function ListCitizenCollects() {
  const [openCollectSubmissionsDialog, setOpenCollectSubmissionsDialog] =
    useState<boolean[]>([]);
  const { data: collects, isLoading } = useQuery<Collect[]>(
    ["citizenCollects"],
    () => CollectServiceQuery.loadAllCitizenCollects(),
    {
      onSuccess(data) {
        setOpenCollectSubmissionsDialog(Array(data.length).fill(false));
      },
    }
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleOpenDialog = (
    state: boolean[],
    setState: Function,
    index: number
  ) => {
    setState(state.map((s, position) => (position === index ? true : s)));
  };

  return (
    <>
      {isLoading || !collects ? (
        <LoadingTableData
          headingTitle="Vistorias Cidadãs"
          headingSteps={[
            {
              title: "Dashboard",
              url: "/",
            },
            {
              title: "Vistorias Cidadãs",
              url: "/",
            },
          ]}
        />
      ) : (
        <Grid style={{ width: "100%", marginTop: 14 }} item>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Heading
              title="Vistorias Cidadãs"
              steps={[
                {
                  title: "Dashboard",
                  url: "/",
                },
                {
                  title: "Vistorias Cidadãs",
                  url: "/",
                },
              ]}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Usuário Responsável</TableCell>
                    <TableCell align="center">Data</TableCell>
                    <TableCell align="center">Status da Coleta</TableCell>
                    <TableCell align="center">Envios</TableCell>
                    <TableCell align="center">Excluir</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {collects
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((collect, index) => (
                      <React.Fragment key={collect.id!}>
                        <TableRow>
                          <TableCell align="center">
                            {collect.user_email}
                          </TableCell>
                          <TableCell align="center">
                            {convertEphocDate(collect.date)}
                          </TableCell>
                          <TableCell align="center">
                            {collectStatusMapping(collect.queue_status)}
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Envios">
                              <IconButton
                                onClick={() =>
                                  handleOpenDialog(
                                    openCollectSubmissionsDialog,
                                    setOpenCollectSubmissionsDialog,
                                    index
                                  )
                                }
                              >
                                <Collections />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Excluir">
                              <IconButton>
                                <Delete color="error" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                        <CollectSubmissionDialog
                          collect={collect}
                          index={index}
                          state={openCollectSubmissionsDialog}
                          setState={setOpenCollectSubmissionsDialog}
                          fullScreen
                          title="Envios - Vistoria Cidadã"
                        />
                      </React.Fragment>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                data={collects}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                page={page}
                setPage={setPage}
              />
            </Heading>
          </Paper>
        </Grid>
      )}
    </>
  );
}
