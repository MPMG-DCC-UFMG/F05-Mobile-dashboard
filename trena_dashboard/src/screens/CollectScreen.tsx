import { observer } from "mobx-react";
import React from "react";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { useStores } from "../core/contexts/UseStores";
import { CollectView } from "./views/collect/CollectView";
import { PhotoView } from "./views/photo/PhotoView";

export const CollectScreen: React.FC<any> = observer((props) => {
  const { collectStore } = useStores();

  collectStore.loadCollects();

  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <div>
          {collectStore.selectedCollect ? (
            <PhotoView photos={collectStore.selectedCollect.photos} />
          ) : (
            <CollectView showPublicWork={true} />
          )}
        </div>
      </DashboardContentContainer>
    </DashboardContainer>
  );
});
