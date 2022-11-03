import { observer } from "mobx-react";
import React from "react";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { ListInspection } from "../components/lists/ListInspection";
import { useStores } from "../core/contexts/UseStores";

export const InspectionScreen: React.FC<any> = observer((props) => {
  const { inspectionStore } = useStores();
  inspectionStore.loadInspections();

  return (
    <DashboardContainer>
      <DashboardContentContainer>
            <ListInspection />
      </DashboardContentContainer>
    </DashboardContainer>
  );
});
