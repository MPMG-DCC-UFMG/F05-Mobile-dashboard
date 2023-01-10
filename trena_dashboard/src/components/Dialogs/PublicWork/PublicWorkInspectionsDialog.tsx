import { Flag } from "@material-ui/icons";
import { Email, QueryStats, TextFields } from "@mui/icons-material";
import React from "react";
import { useQuery } from "react-query";
import { Inspection } from "../../../core/models/Inspection";
import { InspectionServiceQuery } from "../../../core/network/services/InspectionService";
import {
  convertEphocDate,
  inspectionsStatusMapping,
} from "../../../utils/mapper";
import { InfoAccorion } from "../../Accordion";
import { InfoTextField } from "../../Inputs/InfoTextField";
import { WarningField } from "../../WarningField";
import { TableDialogContainer } from "../DialogContainer";

interface PublicWorkInspectionsDialogProps {
  state: boolean[];
  setState(state: boolean[]): void;
  index: number;
  title: string;
  publicWorkId: string;
}

export function PublicWorkInspectionsDialog({
  state,
  setState,
  title,
  index,
  publicWorkId,
}: PublicWorkInspectionsDialogProps) {
  const { data } = useQuery<Inspection[]>(
    ["getPublicWorkInspections", publicWorkId],
    () => InspectionServiceQuery.getPublicWorkInspections(publicWorkId)
  );

  // const hasInspections = data && data.length > 0;

  // const inspectionsCollects = useQueries(
  //   data!.map((inspection) => ({
  //     queryKey: ["getInspectionMedia", inspection.flag!],
  //     queryFn: () =>
  //       InspectionServiceQuery.getInspectionCollects(inspection.flag!),
  //     enabled: hasInspections,
  //   }))
  // );

  return (
    <TableDialogContainer
      state={state}
      setState={setState}
      index={index}
      title={data && data.length > 0 ? title : "Ausência de Dados"}
      fullScreen={data && data.length > 0}
    >
      {data ? (
        data.map((inspection: Inspection) => (
          <InfoAccorion
            key={inspection.flag}
            title={`${inspection.name} - ${
              inspection.flag ? "Vistoria Técnica" : "Vistoria Cidadã"
            } - ${convertEphocDate(inspection.request_date)}`}
          >
            <InfoTextField
              disabled
              fullWidth
              icon={<Flag />}
              label="Data de Inspeção"
              defaultValue={convertEphocDate(inspection.request_date)}
            />
            <InfoTextField
              disabled
              fullWidth
              icon={<QueryStats />}
              label="Status"
              defaultValue={inspectionsStatusMapping(inspection.status!)}
            />
            <InfoTextField
              disabled
              fullWidth
              icon={<Email />}
              label="Email usuário"
              defaultValue={inspection.user_email}
            />
            <InfoTextField
              disabled
              fullWidth
              icon={<TextFields />}
              label="Descrição"
              defaultValue={inspection.description}
              type="text"
            />
          </InfoAccorion>
        ))
      ) : (
        <WarningField
          title="Ausência de Vistorias"
          message="Esta Obra ainda não possui nenhuma vistoria vinculada."
          severity="warning"
        />
      )}
    </TableDialogContainer>
  );
}
