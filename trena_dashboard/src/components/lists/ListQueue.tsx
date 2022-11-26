import { Check, Close, Collections } from "@mui/icons-material";
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
import { convertEphocDate } from "../../utils/mapper";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";

export function ListQueue() {
  const { data: queue, isLoading } = useQuery<Collect[]>(
    ["queueCollects"],
    () => CollectServiceQuery.getQueueCollects()
  );

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  return (
    <>
      {isLoading || !queue ? (
        <LoadingTableData
          headingTitle="Fila de Envios"
          headingSteps={[
            {
              title: "Dashboard",
              url: "/dashboard",
            },
            {
              title: "Fila de Envios",
              url: "/",
            },
          ]}
        />
      ) : (
        <Grid style={{ width: "100%", marginTop: 14 }} item>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Heading
              title="Fila de Envios"
              steps={[
                {
                  title: "Dashboard",
                  url: "/dashboard",
                },
                {
                  title: "Fila de Envios",
                  url: "/",
                },
              ]}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Obra</TableCell>
                    <TableCell align="center">Usuário Responsável</TableCell>
                    <TableCell align="center">Data</TableCell>
                    <TableCell align="center">Envios</TableCell>
                    <TableCell align="center">Aceitar</TableCell>
                    <TableCell align="center">Recusar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {queue
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((collect, index) => (
                      <React.Fragment key={collect.id!}>
                        <TableRow>
                          <TableCell align="center">
                            {collect.public_work_id}
                          </TableCell>
                          <TableCell align="center">
                            {collect.user_email}
                          </TableCell>
                          <TableCell align="center">
                            {convertEphocDate(collect.date)}
                          </TableCell>

                          <TableCell align="center">
                            <Tooltip title="Envios">
                              <IconButton>
                                <Collections />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Aceitar">
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
                      </React.Fragment>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                data={queue}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
              />
            </Heading>
          </Paper>
        </Grid>
      )}
    </>
  );
}
