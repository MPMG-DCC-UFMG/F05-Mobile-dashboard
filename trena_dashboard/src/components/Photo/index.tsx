import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { Photo as PhotoModel } from "../../core/models/Photo";
import { CollectServiceQuery } from "../../core/network/services/CollectService";

interface PhotoCardProps {
  photo: PhotoModel;
  photoNumber: number;
}

export function PhotoCard({ photo, photoNumber }: PhotoCardProps) {
  const [, filename] = photo.filepath.split("/");

  const { data: image } = useQuery(["getImage", photo.id], () =>
    CollectServiceQuery.getMediaByCollectFileName(filename)
  );

  return (
    <Card sx={{ width: 400 }}>
      <CardMedia
        component="img"
        height={200}
        image={`data:;base64,${image}`}
        alt={`Foto ${photoNumber}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`Foto ${photoNumber}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {photo.comment ? photo.comment : "Não há comentário para este envio."}
        </Typography>
      </CardContent>
    </Card>
  );
}
