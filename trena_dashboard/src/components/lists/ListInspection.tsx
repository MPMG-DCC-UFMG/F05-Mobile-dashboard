import { Collections, PictureAsPdf } from "@mui/icons-material";
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
import { useMutation, useQuery } from "react-query";
import { Inspection } from "../../core/models/Inspection";
import { InspectionServiceQuery } from "../../core/network/services/InspectionService";
import { inspectionsStatusMapping } from "../../utils/mapper";
import { InspectionCollectsDialog } from "../Dialogs/Inspection/InspectionCollects";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";

export function ListInspection() {
  const { data: inspections, isLoading } = useQuery<Inspection[]>(
    "getMpInspections",
    InspectionServiceQuery.loadInspections,
    {
      onSuccess: (data) => {
        setOpenCollectsModal(Array(data.length).fill(false));
      },
    }
  );

  const { mutate, isLoading: isMutationLoading } = useMutation(
    InspectionServiceQuery.getInspectionReport
  );

  const [openCollectsModal, setOpenCollectsModal] = useState<boolean[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleOpenCollectsModal = (index: number) => {
    setOpenCollectsModal(
      openCollectsModal.map((value, pos) => (index === pos ? true : value))
    );
  };

  const handleGenerateReport = (flag: number) => {
    mutate(flag);
  };

  return (
    <>
      {isLoading || !inspections ? (
        <LoadingTableData
          headingTitle="Vistorias"
          headingSteps={[
            {
              title: "Dashboard",
              url: "/",
            },
            {
              title: "Vistorias",
              url: "/",
            },
          ]}
        />
      ) : (
        <Grid style={{ width: "100%", marginTop: 14 }} item>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Heading
              title="Vistorias"
              steps={[
                {
                  title: "Dashboard",
                  url: "/",
                },
                {
                  title: "Vistorias",
                  url: "/",
                },
              ]}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Nome</TableCell>
                    <TableCell align="center">Usuário Responsável</TableCell>
                    <TableCell align="center">ID Obra</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Coletas</TableCell>
                    <TableCell align="center">Relatório</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inspections
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((inspection, index) => (
                      <React.Fragment key={inspection.flag}>
                        <TableRow>
                          <TableCell align="center">
                            {inspection.name}
                          </TableCell>
                          <TableCell align="center">
                            {inspection.user_email}
                          </TableCell>
                          <TableCell align="center">
                            {inspection.public_work_id}
                          </TableCell>
                          <TableCell align="center">
                            {inspectionsStatusMapping(inspection.status!)}
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Coletas">
                              <IconButton
                                onClick={() => handleOpenCollectsModal(index)}
                              >
                                <Collections />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Gerar Relatório">
                              <IconButton
                                onClick={() =>
                                  handleGenerateReport(inspection.flag!)
                                }
                              >
                                <PictureAsPdf htmlColor="#E00000" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                        <InspectionCollectsDialog
                          index={index}
                          inspectionId={inspection.flag!}
                          state={openCollectsModal}
                          setState={setOpenCollectsModal}
                          fullScreen
                          title={`Coletas - ${inspection.flag}`}
                        />
                      </React.Fragment>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                page={page}
                setPage={setPage}
                data={inspections!}
              />
            </Heading>
          </Paper>
        </Grid>
      )}
    </>
  );
}
