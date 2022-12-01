import { Flag } from "@material-ui/icons";
import { Email, QueryStats, TextFields } from "@mui/icons-material";
import React from "react";
import { useQuery } from "react-query";
import { Inspection } from "../../../core/models/Inspection";
import { InspectionServiceQuery } from "../../../core/network/services/InspectionService";
import { inspectionsStatusMapping } from "../../../utils/mapper";
import { InfoAccorion } from "../../Accordion";
import { InfoTextField } from "../../Inputs/InfoTextField";
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
  const query = InspectionServiceQuery.getPublicWorkInspections;

  const { data, isLoading, isIdle } = useQuery(
    ["workInspections", publicWorkId],
    () => query(publicWorkId)
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
      title={title}
      fullScreen={true}
    >
      {data?.map((inspection: Inspection) => (
        <InfoAccorion
          key={inspection.flag}
          title={`Inspeção - ${inspection.name}`}
        >
          <InfoTextField
            disabled
            fullWidth
            icon={<Flag />}
            label="Flag"
            defaultValue={inspection.flag?.toString()}
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
      ))}
    </TableDialogContainer>
  );
}
