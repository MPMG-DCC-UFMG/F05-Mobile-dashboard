import { CalendarMonth, Gite, Security } from "@mui/icons-material";
import { Container, Grid } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { CollectServiceQuery } from "../../core/network/services/CollectService";
import { InspectionServiceQuery } from "../../core/network/services/InspectionService";
import { PublicWorkServiceQuery } from "../../core/network/services/PublicWorkService";
import { Card } from "./CardModel";

export function HomeCards() {
  const navigate = useNavigate();
  const { data: publicWorkCount } = useQuery<number>(["publicWorkCount"], () =>
    PublicWorkServiceQuery.countPublicWork()
  );
  const { data: mpInspections } = useQuery<number>(["mpInspectionsCount"], () =>
    InspectionServiceQuery.countMpInspections()
  );
  const { data: usersInspections } = useQuery<number>(
    ["usersInspectionsCount"],
    () => CollectServiceQuery.collectMonthCount()
  );

  const handleClickWorks = () => navigate("/publicWork");
  const handleClickInspections = () => navigate("/inspections");
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
            iconColor="blue"
            onClick={handleClickWorks}
          />
        </Grid>
        <Grid item style={{ width: "33.3%" }}>
          <Card
            title="Vistorias Técnicas"
            icon={<Security />}
            value={mpInspections ? mpInspections.toString() : "0"}
            iconColor="#ED0000"
            onClick={handleClickInspections}
          />
        </Grid>
        <Grid item style={{ width: "33.3%" }}>
          <Card
            title="Vistorias Cidadãs no mês"
            icon={<CalendarMonth />}
            value={usersInspections ? usersInspections.toString() : "0"}
            iconColor="#000000"
            onClick={handleClickQueue}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
