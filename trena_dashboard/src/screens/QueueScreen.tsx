import React from "react";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { QueueItem } from "../components/Queue/QueueItem";

export function QueueScreen() {
  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <QueueItem
          title="Não há novos dados da obra"
          value="1 Coleta"
          onClick={() => console.log("a")}
        />
        <QueueItem
          title="Não há novos dados da obra"
          value="2 Coletas"
          onClick={() => console.log("a")}
        />
      </DashboardContentContainer>
    </DashboardContainer>
  );
}
