import React from "react";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { ListQueue } from "../components/lists/ListQueue";
import { useStores } from "../core/contexts/UseStores";

export const QueueScreen: React.FC<any> = (props) => {
  const { queueStore } = useStores();
  queueStore.loadQueueItem();

  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <div>
          <ListQueue />
        </div>
      </DashboardContentContainer>
    </DashboardContainer>
  );
};
