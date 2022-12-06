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
  const { data, isLoading } = useQuery<Inspection[]>(
    ["getPublicWorkInspections", publicWorkId],
    () => InspectionServiceQuery.getPublicWorkInspections(publicWorkId)
  );

  if (isLoading) {
    <TableDialogContainer
      state={state}
      setState={setState}
      index={index}
      title={title}
    >
      <h1>Loading...</h1>
    </TableDialogContainer>;
  }

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
            title={`${inspection.name} - ${convertEphocDate(
              inspection.request_date
            )}`}
          >
            <InfoTextField
              disabled
              fullWidth
              icon={<Flag />}
              label="Flag"
              defaultValue={
                // inspection.flag?.toString()
                inspection.request_date.toString()
              }
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
