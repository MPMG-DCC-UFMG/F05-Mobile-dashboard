import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { Collect } from "../../core/models/Collect";
import { WorkStatus } from "../../core/models/WorkStatus";
import { WorkStatusServiceQuery } from "../../core/network/services/WorkStatusService";
import { convertEphocDate } from "../../utils/mapper";

interface QueueColectsProps {
  collect: Collect;
  publicWorkStatusFlag: number;
}

export function QueueCollects({
  collect,
  publicWorkStatusFlag,
}: QueueColectsProps) {
  const { data: publicWorkStatusMapped } = useQuery<WorkStatus>(
    ["getPublicWorkStatus"],
    () => WorkStatusServiceQuery.loadWorkStatusById(publicWorkStatusFlag)
  );

  return (
    <Grid style={{ width: "100%", marginTop: 14 }} item>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Usuário Responsável</TableCell>
            <TableCell align="center">Data de Coleta</TableCell>
            <TableCell align="center">Data de Envio</TableCell>
            <TableCell align="center">Estado da Obra</TableCell>
            <TableCell align="center">Comentário</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableCell align="center">{collect.user_email}</TableCell>
          <TableCell align="center">{convertEphocDate(collect.date)}</TableCell>
          <TableCell align="center">
            {convertEphocDate(collect.queue_status_date)}
          </TableCell>
          <TableCell align="center">{publicWorkStatusMapped?.name}</TableCell>
          <TableCell align="center">
            {collect.comments ? collect.comments : "Não há comentários"}
          </TableCell>
        </TableBody>
      </Table>
    </Grid>
  );
}
