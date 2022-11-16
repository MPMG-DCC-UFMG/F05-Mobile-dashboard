import { VerifiedUser } from "@material-ui/icons";
import { CalendarMonth, TextFields, Troubleshoot } from "@mui/icons-material";

import React from "react";
import uuid from "react-uuid";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { inspectionsStatusMapping } from "../../../utils/mapper";
import { InfoAccorion } from "../../Accordion";
import { InfoTextField } from "../../Inputs/InfoTextField";
import { MockSwiper } from "../../Swiper";
import { TableDialogContainer, TableDialogProps } from "../DialogContainer";

interface InspectionCollectsDialogProps extends TableDialogProps {
  inspectionId: number;
}

export function InspectionCollectsDialog({
  state,
  setState,
  title,
  fullScreen,
  index,
  inspectionId,
}: InspectionCollectsDialogProps) {
  const mock = [1, 2, 3];

  return (
    <TableDialogContainer
      fullScreen={fullScreen}
      state={state}
      setState={setState}
      title={title}
      index={index}
    >
      {mock.map((mock, index) => (
        <InfoAccorion key={mock} title={`Coleta: ${uuid()}`}>
          <InfoTextField
            disabled
            fullWidth
            icon={<CalendarMonth />}
            label="Data"
            defaultValue={`1${mock}/11/2022`}
          />
          <InfoTextField
            disabled
            fullWidth
            icon={<VerifiedUser />}
            label="Usuário Responsável"
            defaultValue={"admin_dashboard@gmail.com"}
          />
          <InfoTextField
            disabled
            fullWidth
            icon={<Troubleshoot />}
            label="Status"
            defaultValue={inspectionsStatusMapping(mock)}
          />
          <InfoTextField
            disabled
            fullWidth
            icon={<TextFields />}
            label="Comentários"
            defaultValue="Comentário genérico"
          />
          <MockSwiper />
        </InfoAccorion>
      ))}
    </TableDialogContainer>
  );
}
