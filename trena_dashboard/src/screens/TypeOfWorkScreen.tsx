import { Grid } from "@mui/material";
import React from "react";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { ListTypeWork } from "../components/lists/ListTypeWork";
import { useStores } from "../core/contexts/UseStores";

export const TypeOfWorkScreen: React.FC<any> = (props) => {
  const { typeWorkStore } = useStores();
  typeWorkStore.loadTypeWorkList();

  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <Grid item xs={12}>
          <ListTypeWork />
        </Grid>
      </DashboardContentContainer>
    </DashboardContainer>
  );
};
