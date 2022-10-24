import { CalendarMonth, Gite, Queue } from "@mui/icons-material";
import { Container, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useStores } from "../../core/contexts/UseStores";
import { Card } from "./CardModel";

export function HomeCards() {
  const { statisticsStore } = useStores();
  const navigate = useNavigate();

  const handleClickWorks = () => navigate("/publicWork");
  const handleClickCollect = () => navigate("/collect");
  const handleClickQueue = () => navigate("/queue");

  return (
    <Container
      style={{ paddingRight: "0px", width: "100%", paddingTop: "36px" }}
    >
      <Grid spacing={3} container>
        <Grid item style={{ width: "33.3%" }}>
          <Card
            title="Obras cadastradas"
            icon={<Gite />}
            value={statisticsStore.publicWorkCount.toString()}
            iconColor="gold"
            onClick={handleClickWorks}
          />
        </Grid>
        <Grid item style={{ width: "33.3%" }}>
          <Card
            title="Coletas no Mês"
            icon={<CalendarMonth />}
            value={statisticsStore.collectMonthCount.toString()}
            iconColor="gray"
            onClick={handleClickCollect}
          />
        </Grid>
        <Grid item style={{ width: "33.3%" }}>
          <Card
            title="Dados na Fila"
            icon={<Queue />}
            value={statisticsStore.queueCount.toString()}
            iconColor="gray"
            onClick={handleClickQueue}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
