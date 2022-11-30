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
  const [queue, setQueue] = useState<PublicWork[]>([]);
  const [openQueueDialog, setOpenQueueDialog] = useState<boolean[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const { data: publicWorks, isLoading } = useQuery<PublicWork[]>(
    ["getPublicWorksQueue"],
    () => PublicWorkServiceQuery.loadPublicWorks(),
    {
      onSuccess(data) {
        const filteredPublicWorks = data.filter(
          (publicWork) => publicWork.queue_status === 0
        );
        setQueue(filteredPublicWorks);
        setOpenQueueDialog(Array(filteredPublicWorks.length).fill(false));
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
      {!isLoading && publicWorks && queue.length === 0 && (
        <WarningField
          title="Não há Obras na Fila!"
          message="No momento não há nenhuma Obra para ser validada."
          severity="warning"
        />
      )}
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
                {queue
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((publicWork, index) => (
                    <React.Fragment key={publicWork.id}>
                      <TableRow>
                        <TableCell align="center">{publicWork.name}</TableCell>
                        <TableCell align="center">
                          {addressFormatter(publicWork.address)}
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Avaliar">
                            <IconButton
                              onClick={() => handleOpenQueueDialog(index)}
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Aprovar">
                            <IconButton>
                              <Check color="success" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Recusar">
                            <IconButton>
                              <Close color="error" />
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
              data={queue}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              page={page}
              setPage={setPage}
            />
          </Heading>
        </Paper>
      </Grid>
    </>
  );
}
