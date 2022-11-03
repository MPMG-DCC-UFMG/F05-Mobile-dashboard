import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

export function QueueCollects() {
  return (
    <Grid style={{ width: "100%", marginTop: 14 }} item>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">ID da Coleta</TableCell>
            <TableCell align="center">Data</TableCell>
            <TableCell align="center">Estado da Obra</TableCell>
            <TableCell align="center">Quantidade de Fotos</TableCell>
            <TableCell align="center">Comentário</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableCell align="center">
            f5068047-15df-27d3-8666-c5345ecf9c8a
          </TableCell>
          <TableCell align="center">12/11/2022</TableCell>
          <TableCell align="center">Em Execução</TableCell>
          <TableCell align="center">3</TableCell>
          <TableCell align="center"></TableCell>
        </TableBody>
      </Table>
    </Grid>
  );
}
