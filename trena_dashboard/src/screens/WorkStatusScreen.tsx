import { Grid } from "@mui/material";
import React from "react";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { ListWorkStatus } from "../components/lists/ListWorkStatus";

export const WorkStatusScreen: React.FC<any> = (props) => {
  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <Grid item xs={12}>
          <ListWorkStatus />
        </Grid>
      </DashboardContentContainer>
    </DashboardContainer>
  );
};
