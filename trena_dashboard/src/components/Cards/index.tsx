import { CalendarMonth, Gite, Queue } from "@mui/icons-material";
import { Container, Grid } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { CollectServiceQuery } from "../../core/network/services/CollectService";
import { PublicWorkServiceQuery } from "../../core/network/services/PublicWorkService";
import { QueueServiceQuery } from "../../core/network/services/QueueService";
import { Card } from "./CardModel";

export function HomeCards() {
  const navigate = useNavigate();
  const { data: publicWorkCount } = useQuery<number>(["publicWorkCount"], () =>
    PublicWorkServiceQuery.countPublicWork()
  );
  const { data: collectMountCount } = useQuery<number>(
    ["collectMounthCount"],
    () => CollectServiceQuery.collectMonthCount()
  );
  const { data: queueCount } = useQuery<number>(["queueCount"], () =>
    QueueServiceQuery.countQueue()
  );

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
            value={publicWorkCount ? publicWorkCount.toString() : "0"}
            iconColor="gold"
            onClick={handleClickWorks}
          />
        </Grid>
        <Grid item style={{ width: "33.3%" }}>
          <Card
            title="Coletas no Mês"
            icon={<CalendarMonth />}
            value={collectMountCount ? collectMountCount.toString() : "0"}
            iconColor="gray"
            onClick={handleClickCollect}
          />
        </Grid>
        <Grid item style={{ width: "33.3%" }}>
          <Card
            title="Dados na Fila"
            icon={<Queue />}
            value={queueCount ? queueCount.toString() : "0"}
            iconColor="green"
            onClick={handleClickQueue}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
