import React from "react";
import { DashboardContentContainer } from "../components/containers/ContentContainer";
import { DashboardContainer } from "../components/containers/DashboardContainer";
import { ListPublicWork } from "../components/lists/ListPublicWork";

export const PublicWorkScreen: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <ListPublicWork />
      </DashboardContentContainer>
    </DashboardContainer>
  );
};

