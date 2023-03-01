import { Box, Container, Grid } from "@mui/material"
import React from "react"
import { useMenuStore } from "../../core/store/menu"
import { AppBar } from "../AppBar"
import { Drawer } from "../Drawer"

interface DashboardContainerProps {
  children?: React.ReactNode
}

export function DashboardContainer({ children }: DashboardContainerProps) {
  const { collapse, toggleDrawer } = useMenuStore()

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar open={collapse} toggleDrawer={toggleDrawer} />
      <Drawer open={collapse} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          backgroundColor: theme =>
            theme.palette.mode === "dark"
              ? theme.palette.grey[700]
              : theme.palette.grey[100]
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
          <Grid container spacing={3}>
            {children}
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
