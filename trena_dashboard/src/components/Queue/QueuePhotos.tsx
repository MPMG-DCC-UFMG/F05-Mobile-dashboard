import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Container,
  Grid,
} from "@mui/material";
import React from "react";

interface QueueCardPhotoProps {
  imgPath: string;
}

function QueueCardPhoto({ imgPath }: QueueCardPhotoProps) {
  return (
    <Card sx={{ maxWidth: 345, mt: 2, mb: 2 }}>
      <CardHeader title="Fachada" />
      <CardMedia component="img" height="194" image={imgPath} />
      <CardActions>
        <Button color="success" variant="contained">
          Aceitar
        </Button>
        <Button color="error" variant="contained">
          Recusar
        </Button>
      </CardActions>
    </Card>
  );
}

export function QueuePhotos() {
  return (
    <>
      <Container style={{ width: "100%", height: "100%" }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <QueueCardPhoto imgPath="../../img1.jpg" />
          <QueueCardPhoto imgPath="../../img2.jpg" />
          <QueueCardPhoto imgPath="../../img3.jpg" />
        </Grid>
      </Container>
    </>
  );
}
