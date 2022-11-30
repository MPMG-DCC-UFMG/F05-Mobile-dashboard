import React from "react";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { ListPublicWorkQueue } from "../components/lists/ListPublicWorkQueue";

export function PublicWorkQueueScreen() {
  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <ListPublicWorkQueue />
      </DashboardContentContainer>
    </DashboardContainer>
  );
}
