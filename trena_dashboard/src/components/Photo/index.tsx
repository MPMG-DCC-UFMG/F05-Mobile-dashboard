import { Card, CardContent, CardMedia, Link, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { Photo as PhotoModel } from "../../core/models/Photo";
import { CollectServiceQuery } from "../../core/network/services/CollectService";
import { convertLatLngToDMS } from "../../utils/mapper";

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
    <Card sx={{ width: 500, mt: 4, mb: 4 }}>
      <CardMedia
        component="img"
        height={400}
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
        <Typography variant="body2" color="tex.secondary">
          <Link
            href={`https://maps.google.com/?q=${photo.latitude},${photo.longitude}&z=15`}
            underline="none"
            target="__blank"
          >
            {convertLatLngToDMS(photo.latitude, photo.longitude)}
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
