import { Box, CssBaseline, Grid, Paper } from "@mui/material";
import React from "react";

import background from "../../assets/logo-mpmg-alternativa.png";
import logo from "../../assets/logo512-no-bg.png";

interface AsideLoginContainerProps {
  children?: JSX.Element | JSX.Element[];
}

export function AsideLoginContainer({ children }: AsideLoginContainerProps) {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            sx={{
              height: 200,
              width: 200,
            }}
            src={logo}
          />
          <Box component="form" noValidate sx={{ mt: 1 }}>
            {children}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
