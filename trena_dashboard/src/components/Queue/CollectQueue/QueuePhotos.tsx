import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";
import { Collect } from "../../../core/models/Collect";
import { Photo } from "../../../core/models/Photo";
import { TypePhoto } from "../../../core/models/TypePhoto";
import { CollectServiceQuery } from "../../../core/network/services/CollectService";
import { TypePhotoServiceQuery } from "../../../core/network/services/TypePhotoService";
import { convertEphocDate } from "../../../utils/mapper";

interface QueueCardPhotoProps {
  photo: Photo;
  date: number;
  acceptedPhotos: Photo[];
  setAcceptedPhotos: (photos: Photo[]) => void;
  rejectedPhotos: Photo[];
  setRejectedPhotos: (photos: Photo[]) => void;
}

function QueueCardPhoto({
  photo,
  date,
  acceptedPhotos,
  setAcceptedPhotos,
  rejectedPhotos,
  setRejectedPhotos,
}: QueueCardPhotoProps) {
  const [, filename] = photo.filepath.split("/");
  const [isAccepted, setIsAccepted] = useState(true);

  const { data: image } = useQuery(["getImage", photo.id], () =>
    CollectServiceQuery.getMediaByCollectFileName(filename)
  );

  const { data: photoTypes } = useQuery<TypePhoto[]>(["getPhotoTypes"], () =>
    TypePhotoServiceQuery.loadTypePhotos()
  );

  const photoType =
    photoTypes && photoTypes.find((type) => type.flag! === Number(photo.type));

  const handleRejectPhoto = () => {
    const newRejectedPhotos = new Set([...rejectedPhotos, photo]);
    setRejectedPhotos(Array.from(newRejectedPhotos));
    setIsAccepted(false);
  };

  const handleAcceptPhoto = () => {
    const newAcceptedPhotos = new Set([...rejectedPhotos, photo]);
    setAcceptedPhotos(Array.from(newAcceptedPhotos));
    setIsAccepted(true);
  };

  useEffect(() => {
    setAcceptedPhotos([...acceptedPhotos, photo]);
    setIsAccepted(true);
  }, []);

  return (
    <Card sx={{ maxWidth: 345, mt: 2, mb: 2 }}>
      <CardHeader title={photoType ? photoType.name : "Sem tipo definido"} />
      <CardMedia component="img" height="194" src={`data:;base64,${image}`} />
      <Typography variant="body2" color="text.secondary">
        {photo.comment ? photo.comment : "Foto sem comentários."}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {`${convertEphocDate(date)}`}
      </Typography>
      <CardActions>
        <Button
          disabled={isAccepted}
          onClick={handleAcceptPhoto}
          color="success"
          variant="contained"
        >
          Aceitar
        </Button>
        <Button
          disabled={!isAccepted}
          onClick={handleRejectPhoto}
          color="error"
          variant="contained"
        >
          Recusar
        </Button>
      </CardActions>
    </Card>
  );
}

interface QueuePhotosProps {
  collectsOfPublicWork: Collect[];
  acceptedPhotos: Photo[];
  setAcceptedPhotos: (photos: Photo[]) => void;
  rejectedPhotos: Photo[];
  setRejectedPhotos: (photos: Photo[]) => void;
}

export function QueuePhotos({
  collectsOfPublicWork,
  acceptedPhotos,
  setAcceptedPhotos,
  rejectedPhotos,
  setRejectedPhotos,
}: QueuePhotosProps) {
  const collectsMetadata = useQueries(
    collectsOfPublicWork.map((collect) => ({
      queryKey: ["getCollectMetadata", collect.id!],
      queryFn: () =>
        CollectServiceQuery.getMediaMetaDataByCollectId(collect.id!),
      enabled: collectsOfPublicWork.length > 0,
    }))
  );

  return (
    <>
      <Container style={{ width: "100%", height: "100%" }}>
        <Grid container justifyContent="space-between" alignItems="center">
          {collectsMetadata.map((collect) =>
            collect.data
              ? collect.data.map((photo) => (
                  <QueueCardPhoto
                    key={photo.id}
                    rejectedPhotos={rejectedPhotos}
                    setRejectedPhotos={setRejectedPhotos}
                    acceptedPhotos={acceptedPhotos}
                    setAcceptedPhotos={setAcceptedPhotos}
                    date={photo.timestamp}
                    photo={photo}
                  />
                ))
              : null
          )}
        </Grid>
      </Container>
    </>
  );
}
