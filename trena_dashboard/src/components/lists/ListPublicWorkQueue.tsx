import { Check, Close, Visibility } from "@mui/icons-material";
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
import { PublicWork } from "../../core/models/PublicWork";
import { PublicWorkServiceQuery } from "../../core/network/services/PublicWorkService";
import { addressFormatter } from "../../utils/mapper";
import { EvaluatePublicQueueDialog } from "../Dialogs/Queue/EvaluatePublicQueueItem";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";
import { WarningField } from "../WarningField";

export function ListPublicWorkQueue() {
  const [openQueueDialog, setOpenQueueDialog] = useState<boolean[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const { data: publicWorks, isLoading } = useQuery<PublicWork[]>(
    ["getPublicWorksQueue"],
    () => PublicWorkServiceQuery.loadPublicWorkQueue(),
    {
      onSuccess(data) {
        setOpenQueueDialog(Array(data.length).fill(false));
      },
    }
  );

  const handleOpenQueueDialog = (index: number) => {
    setOpenQueueDialog(
      openQueueDialog.map((s, pos) => (pos === index ? true : s))
    );
  };

  return (
    <>
      {isLoading ||
        (!publicWorks && (
          <LoadingTableData
            headingTitle="Fila de Obras"
            headingSteps={[
              {
                title: "Dashboard",
                url: "/",
              },
              {
                title: "Fila de Obras",
                url: "/publicWork/queue",
              },
            ]}
          />
        ))}
      {!isLoading && publicWorks && publicWorks.length === 0 ? (
        <WarningField
          title="Não há Obras na Fila!"
          message="No momento não há nenhuma Obra para ser validada."
          severity="warning"
        />
      ) : (
        <Grid style={{ width: "100%", marginTop: 14 }} item>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Heading
              title="Fila de Obras"
              steps={[
                {
                  title: "Dashboard",
                  url: "/",
                },
                {
                  title: "Fila de Obras",
                  url: "/publicWorks/queue",
                },
              ]}
            >
              {publicWorks && (
                <>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Nome</TableCell>
                        <TableCell align="center">Endereço</TableCell>
                        <TableCell align="center">Avaliar</TableCell>
                        <TableCell align="center">Aprovar</TableCell>
                        <TableCell align="center">Recusar</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {publicWorks
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((publicWork, index) => (
                          <React.Fragment key={publicWork.id}>
                            <TableRow>
                              <TableCell align="center">
                                {publicWork.name}
                              </TableCell>
                              <TableCell align="center">
                                {addressFormatter(publicWork.address)}
                              </TableCell>
                              <TableCell align="center">
                                <Tooltip title="Avaliar">
                                  <IconButton
                                    color="info"
                                    size="small"
                                    onClick={() => handleOpenQueueDialog(index)}
                                  >
                                    <Visibility />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                              <TableCell align="center">
                                <Tooltip title="Aprovar">
                                  <IconButton color="success" size="small">
                                    <Check />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                              <TableCell align="center">
                                <Tooltip title="Recusar">
                                  <IconButton color="error" size="small">
                                    <Close />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                            <EvaluatePublicQueueDialog
                              index={index}
                              state={openQueueDialog}
                              setState={setOpenQueueDialog}
                              fullScreen
                              publicWork={publicWork}
                              title={`Avaliação de Obra Pública - ${publicWork.name}`}
                            />
                          </React.Fragment>
                        ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    data={publicWorks}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    page={page}
                    setPage={setPage}
                  />
                </>
              )}
            </Heading>
          </Paper>
        </Grid>
      )}
    </>
  );
}
