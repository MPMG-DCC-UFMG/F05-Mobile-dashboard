import { Box } from "@mui/material";
import React from "react";
import { useQueries, useQuery } from "react-query";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Photo } from "../../core/models/Photo";
import { CollectServiceQuery } from "../../core/network/services/CollectService";
import { WarningField } from "../WarningField";

import "./styles.css";

interface MediaSwiperProps {
  collectMetadata: Photo[] | undefined;
}

function hasMedia(data: any[] | undefined): data is Photo[] {
  return data !== undefined;
}

export function MediaSwiper({ collectMetadata }: MediaSwiperProps) {
  const isSwiperAvailable = hasMedia(collectMetadata);

  const { data: collectsMedia } = useQuery<any[] | void>(
    isSwiperAvailable
      ? collectMetadata!.map((collect) => {
          return {
            queryKey: ["collectMedia", collect.filepath],
            queryFn: () =>
              CollectServiceQuery.getMediaByCollectFilePath(collect.filepath),
            enabled: isSwiperAvailable,
          };
        })
      : ["undefinedQuery", "collectMedia"],
    () => undefined
  );

  const collectsMediaQueries = useQueries<Photo[]>(
    collectMetadata!.map((collect) => {
      return {
        queryKey: ["collectMedia", collect.filepath],
        queryFn: () =>
          CollectServiceQuery.getMediaByCollectFilePath(collect.filepath),
        enabled: isSwiperAvailable,
        onSuccess(data) {
          console.log(data);
        },
      };
    })
  );

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      {isSwiperAvailable ? (
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={true}
          navigation={true}
          speed={300}
          spaceBetween={50}
          slidesPerView={1}
          className="mySwiper"
        >
          {collectsMedia!.map((photo: Blob, index: number) => (
            <SwiperSlide>
              <img
                src="../publicc/img1.jpg"
                style={{ width: "600px", height: "450px" }}
                alt={`Foto ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <WarningField
          title="Não há envios para esta coleta"
          message="Não foi anexada nenhuma Foto ou Vídeo para esta coleta."
          severity="warning"
        />
      )}
    </Box>
  );
}
