import { Construction, Map } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React from "react";
import { MapView } from "../../screens/views/publicWork/MapView";
import { InfoTextField } from "../Inputs/InfoTextField";

export function QueuePublicWork() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <InfoTextField
        disabled
        defaultValue="Esc. Educ. Infantil - Tipo B"
        icon={<Construction />}
        label="Obra Pública"
        fullWidth
      />
      <InfoTextField
        disabled
        defaultValue="Quatro, 55 - Rio Piracicaba"
        icon={<Map />}
        label="Endereço"
        fullWidth
      />
      <MapView latitude={-19.945471} longitude={-43.183448} zoom={15} />
    </Grid>
  );
}
