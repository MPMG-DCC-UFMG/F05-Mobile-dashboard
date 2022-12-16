import React from "react";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { ListTypeWork } from "../components/lists/ListTypeWork";

export const TypeOfWorkScreen = () => {
  return (
    <DashboardContainer>
      <DashboardContentContainer>
          <ListTypeWork />
      </DashboardContentContainer>
    </DashboardContainer>
  );
};
