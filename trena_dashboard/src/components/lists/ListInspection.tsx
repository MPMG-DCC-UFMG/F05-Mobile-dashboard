import { Collections } from "@mui/icons-material";
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
import { Inspection } from "../../core/models/Inspection";
import { InspectionServiceQuery } from "../../core/network/services/InspectionService";
import { inspectionsStatusMapping } from "../../utils/mapper";
import { InspectionCollectsDialog } from "../Dialogs/Inspection/InspectionCollects";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";

export function ListInspection() {
  const { data: inspections, isLoading } = useQuery<Inspection[]>(
    "getInspections",
    InspectionServiceQuery.loadInspections,
    {
      onSuccess: (data) => {
        setOpenCollectsModal(Array(data.length).fill(false));
      },
    }
  );
  const [openCollectsModal, setOpenCollectsModal] = useState<boolean[]>([]);

  const handleOpenCollectsModal = (index: number) => {
    setOpenCollectsModal(
      openCollectsModal.map((value, pos) => (index === pos ? true : value))
    );
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inspections.map((inspection, index) => (
                    <>
                      <TableRow key={inspection.flag}>
                        <TableCell align="center">{inspection.name}</TableCell>
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
                      </TableRow>
                      <InspectionCollectsDialog
                        index={index}
                        inspectionId={inspection.flag!}
                        state={openCollectsModal}
                        setState={setOpenCollectsModal}
                        fullScreen
                        title={`Coletas - ${inspection.flag}`}
                      />
                    </>
                  ))}
                </TableBody>
              </Table>
              <TablePagination data={inspections!} />
            </Heading>
          </Paper>
        </Grid>
      )}
    </>
  );
}
