import { Grid, Typography } from "@mui/material";
import React from "react";

interface QueueConfirmProps {
  publicWorkId: string;
  photosIds: string[];
}

export function QueueConfirm() {
  return (
    <Grid
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={{ width: "100%", marginTop: 14 }}
      item
    >
      <Typography sx={{ mt: 4, mb: 4 }} variant="h6">
        Confirmar vistoria e salvar no banco de dados?
      </Typography>
    </Grid>
  );
}

