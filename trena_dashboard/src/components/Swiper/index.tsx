import { Box } from "@mui/material";
import React from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "./styles.css";

export function MockSwiper() {
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
        <SwiperSlide>
          <img
            style={{ width: "600px", height: "450px" }}
            src="../../../img1.jpg"
            alt="Imagem 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ width: "600px", height: "450px" }}
            src="../../../img2.jpg"
            alt="Imagem 2"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ width: "600px", height: "450px" }}
            src="../../../img3.jpg"
            alt="Imagem 3"
          />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}
