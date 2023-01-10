import { LocationCity, Public } from "@material-ui/icons";
import {
  HolidayVillage,
  LocationOn,
  NearMe,
  Numbers,
} from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import React from "react";
import { useStores } from "../../core/contexts/UseStores";
import { PublicWork } from "../../core/models/PublicWork";
import { InfoTextField } from "../Inputs/InfoTextField";
import { Map } from "../Map";
import { TableDialogContainer } from "./DialogContainer";

interface MapDialogProps {
  state: boolean[];
  setState(state: boolean[]): void;
  publicWork: PublicWork;
  index: number;
  fullScreen?: boolean;
}

export function MapDialog({
  state,
  setState,
  publicWork,
  index,
  fullScreen,
}: MapDialogProps) {
  const { publicWorkStore, workStatusStore } = useStores();
  publicWorkStore.loadPublicWorkCollects(publicWork.id);
  const collectCount = publicWorkStore.collectsOfPublicWork.length;
  const workStateUser = workStatusStore.getWorkStatusByFlag(
    publicWork.type_work_flag
  );
  const workStateIA = publicWork.rnn_status
    ? workStatusStore.getWorkStatusByFlag(publicWork?.rnn_status)
    : null;

  const handleDownloadClick = () => console.log("Download");

  return (
    <TableDialogContainer
      state={state}
      setState={setState}
      index={index}
      title={`Localização - ${publicWork.name}`}
      fullScreen={fullScreen}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <InfoTextField
          disabled
          defaultValue={publicWork.address.city}
          icon={<LocationCity />}
          label="Cidade"
        />
        <InfoTextField
          disabled
          defaultValue={publicWork.address.cep}
          icon={<Public />}
          label="CEP"
        />
        <InfoTextField
          disabled
          defaultValue={publicWork.address.state}
          icon={<LocationOn />}
          label="UF"
        />
        <InfoTextField
          disabled
          defaultValue={publicWork.address.neighborhood}
          icon={<HolidayVillage />}
          label="Bairro"
        />
        <InfoTextField
          disabled
          defaultValue={publicWork.address.street}
          icon={<NearMe />}
          label="Rua"
        />
        <InfoTextField
          disabled
          defaultValue={publicWork.address.number}
          icon={<Numbers />}
          label="Logradouro"
        />
      </Box>

      <Grid container style={{ width: "100%", height: "100%" }}>
        <Map
          latitude={publicWork.address.latitude}
          longitude={publicWork.address.longitude}
          zoom={15}
        />
      </Grid>
    </TableDialogContainer>
  );
}
