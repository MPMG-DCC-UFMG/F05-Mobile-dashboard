import { Grid } from "@mui/material";
import React from "react";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { ListTypePhoto } from "../components/lists/ListTypePhoto";
import { useStores } from "../core/contexts/UseStores";

export const TypePhotoScreen: React.FC<any> = (props) => {
  const { typePhotoStore } = useStores();
  typePhotoStore.loadTypePhotoList();

  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <Grid item xs={12}>
          <ListTypePhoto />
        </Grid>
      </DashboardContentContainer>
    </DashboardContainer>
  );
};
