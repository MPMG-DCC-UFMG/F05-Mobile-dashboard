import { VerifiedUser } from "@material-ui/icons";
import { CalendarMonth, TextFields, Troubleshoot } from "@mui/icons-material";

import React from "react";
import { useQuery } from "react-query";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Collect } from "../../../core/models/Collect";
import { InspectionServiceQuery } from "../../../core/network/services/InspectionService";

import { collectStatusMapping, convertEphocDate } from "../../../utils/mapper";
import { InfoAccorion } from "../../Accordion";
import { InfoTextField } from "../../Inputs/InfoTextField";
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
  const { data: collects } = useQuery<Collect[]>(
    ["getInspectionCollects", inspectionId],
    () => InspectionServiceQuery.getInspectionCollects(inspectionId)
  );

  const ableToFetchMetadata = collects !== undefined && collects.length > 0;

  // const collectsMetaDataQueries = useQueries(
  //   collects!.map<UseQueryOptions<Photo[] | string, Error>>((collect) => {
  //     return {
  //       queryKey: ["collectMetaData", collect.id!],
  //       queryFn: () =>
  //         CollectServiceQuery.getMediaMetaDataByCollectId(collect.id!),
  //       enabled: !!ableToFetchMetadata,
  //     };
  //   })
  // );

  return (
    <TableDialogContainer
      fullScreen={fullScreen}
      state={state}
      setState={setState}
      title={title}
      index={index}
    >
      {collects ? (
        collects!.map((collect) => (
          <InfoAccorion
            key={collect.id!}
            title={`Coleta realizada em: ${convertEphocDate(collect.date)}`}
          >
            <InfoTextField
              disabled
              fullWidth
              icon={<CalendarMonth />}
              label="Data de Aprovação"
              defaultValue={convertEphocDate(collect.queue_status_date)}
            />
            <InfoTextField
              disabled
              fullWidth
              icon={<VerifiedUser />}
              label="Usuário Responsável"
              defaultValue={collect.user_email}
            />
            <InfoTextField
              disabled
              fullWidth
              icon={<Troubleshoot />}
              label="Status"
              defaultValue={collectStatusMapping(collect.queue_status)}
            />
            <InfoTextField
              disabled
              fullWidth
              icon={<TextFields />}
              label="Comentários"
              defaultValue={
                collect.comments
                  ? collect.comments
                  : "Nenhum comentário foi provido."
              }
            />
            {/* <MediaSwiper
              collectsMetadata={collectsMetaDataQueries.map((qr) => qr.data)}
            /> */}
          </InfoAccorion>
        ))
      ) : (
        <p>Essa vistoria não possui coletas</p>
      )}
    </TableDialogContainer>
  );
}
