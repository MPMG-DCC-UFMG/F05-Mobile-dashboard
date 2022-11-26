import React from "react";
import { CollapseStore } from "../stores/CollapseStore";
import { CollectStore } from "../stores/CollectStore";
import { InspectionStore } from "../stores/InspectionStore";
import { PublicWorkStore } from "../stores/PublicWorkStore";
import { QueueStore } from "../stores/QueueStore";
import { StatisticsStore } from "../stores/StatisticsStore";
import { TypePhotoStore } from "../stores/TypePhotoStore";
import { TypeWorkStore } from "../stores/TypeWorkStore";
import { ViewStore } from "../stores/ViewStore";
import { WorkStatusStore } from "../stores/WorkStatusStore";

export const rootContext = React.createContext({
  typeWorkStore: new TypeWorkStore(),
  publicWorkStore: new PublicWorkStore(),
  viewStore: new ViewStore(),
  typePhotoStore: new TypePhotoStore(),
  statisticsStore: new StatisticsStore(),
  workStatusStore: new WorkStatusStore(),
  queueStore: new QueueStore(),
  collectStore: new CollectStore(),
  inspectionStore: new InspectionStore(),
  collapseStore: new CollapseStore(),
});

