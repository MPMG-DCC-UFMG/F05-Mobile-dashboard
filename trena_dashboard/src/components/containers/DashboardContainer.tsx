import { Box, Container, CssBaseline, Grid } from "@mui/material";
import React, { useState } from "react";
import { useStores } from "../../core/contexts/UseStores";
import { AppBar } from "../appbar";
import { Drawer } from "../drawer";

interface DashboardContainerProps {
  children?: React.ReactNode;
}

export function DashboardContainer({ children }: DashboardContainerProps) {
  const [open, setOpen] = useState(true);
  const { collapseStore } = useStores();
  const toggleDrawer = () => {
    setOpen(!open);
    collapseStore.toggleAppBar();
  };

  return (
    <Box display="flex">
      <CssBaseline />
      <AppBar open={open} toggleDrawer={toggleDrawer} />
      <Drawer open={open} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          backgroundColor: (theme) => theme.palette.grey[100],
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 10, mb: 6 }}>
          <Grid container spacing={3}>
            {children}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

