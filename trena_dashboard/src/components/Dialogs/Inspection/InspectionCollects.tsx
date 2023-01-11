import { VerifiedUser } from "@material-ui/icons";
import { CalendarMonth, TextFields, Troubleshoot } from "@mui/icons-material";
import { Box } from "@mui/material";

import React from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useGetInspectionCollects } from "../../../core/network/queries/inspection/queries";

import { collectStatusMapping, convertEphocDate } from "../../../utils/mapper";
import { InfoAccorion } from "../../Accordion";
import { InfoTextField } from "../../Inputs/InfoTextField";
import { MediaSwiper } from "../../Swiper";
import { WarningField } from "../../WarningField";
import { TableDialogContainer, TableDialogProps } from "../DialogContainer";

interface InspectionCollectsDialogProps extends TableDialogProps {
  inspectionId: number;
}

export function InspectionCollectsDialog({
  state,
  setState,
  title,
  index,
  inspectionId,
}: InspectionCollectsDialogProps) {
  const { data: collects } = useGetInspectionCollects(inspectionId);

  const hasCollects = collects && collects.length > 0;

  return (
    <TableDialogContainer
      fullScreen={hasCollects}
      state={state}
      setState={setState}
      title={hasCollects ? title : "Ausência de Dados"}
      index={index}
    >
      {hasCollects ? (
        collects.map((collect) => (
          <InfoAccorion
            key={collect.id}
            title={`Coleta realizada em: ${convertEphocDate(collect.date)}`}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <InfoTextField
                disabled
                sx={{ width: "33%" }}
                icon={<CalendarMonth />}
                label="Data de Aprovação"
                defaultValue={convertEphocDate(collect.queue_status_date)}
              />
              <InfoTextField
                disabled
                sx={{ width: "33%" }}
                icon={<VerifiedUser />}
                label="Usuário Responsável"
                defaultValue={collect.user_email}
              />
              <InfoTextField
                disabled
                sx={{ width: "33%" }}
                icon={<Troubleshoot />}
                label="Status"
                defaultValue={collectStatusMapping(collect.queue_status)}
              />
            </Box>
            <InfoTextField
              disabled
              fullWidth
              icon={<TextFields />}
              multiline
              label="Comentários"
              defaultValue={
                collect.comments
                  ? collect.comments
                  : "Nenhum comentário foi provido."
              }
            />
            <MediaSwiper collects={collects} />
          </InfoAccorion>
        ))
      ) : (
        <WarningField
          title="Ausência de Mídias"
          message="Esta Vistoria ainda não possui nenhuma Foto/Vídeo"
          severity="warning"
        />
      )}
    </TableDialogContainer>
  );
}
