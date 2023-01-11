import { Box } from "@mui/material";
import React from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Collect } from "../../core/models/Collect";
import { Photo } from "../../core/models/Photo";
import {
  useGetCollectMetadata,
  useGetMediaMetadata,
} from "../../core/network/queries/collect/queries";
import { PhotoCard } from "../Photo";
import { WarningField } from "../WarningField";

import "./styles.css";

interface MediaSwiperProps {
  collects: Collect[];
}

interface RawSwiperProps {
  collect: Collect;
}

export function RawSwiper({ collect }: RawSwiperProps) {
  const { data: photos } = useGetMediaMetadata(collect.id!);

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      pagination={true}
      navigation={true}
      speed={300}
      spaceBetween={50}
      slidesPerView={1}
      className="mySwiper"
    >
      {photos && photos.length > 0 ? (
        photos.map((photo, index) => (
          <SwiperSlide key={photo.id}>
            <PhotoCard photo={photo} photoNumber={index + 1} key={photo.id} />
          </SwiperSlide>
        ))
      ) : (
        <WarningField
          title="Não há envios para esta coleta"
          message="Não foi anexada nenhuma Foto ou Vídeo para esta coleta."
          severity="warning"
        />
      )}
    </Swiper>
  );
}

export function MediaSwiper({ collects }: MediaSwiperProps) {
  const collectsMetadata = useGetCollectMetadata(collects);

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={true}
        navigation={true}
        speed={300}
        spaceBetween={50}
        slidesPerView={1}
        className="mySwiper"
      >
        {collectsMetadata.map((collect, index) =>
          collect.data ? (
            collect.data.map((photo: Photo, photoIndex: number) => (
              <SwiperSlide key={index}>
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  photoNumber={photoIndex + 1}
                />
              </SwiperSlide>
            ))
          ) : (
            <WarningField
              title="Não há envios para esta coleta"
              message="Não foi anexada nenhuma Foto ou Vídeo para esta coleta."
              severity="warning"
              key={index}
            />
          )
        )}
      </Swiper>
    </Box>
  );
}
