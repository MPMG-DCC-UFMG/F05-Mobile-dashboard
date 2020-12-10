import {TypeWorkStore} from "../stores/TypeWorkStore";
import React from "react";
import {PublicWorkStore} from "../stores/PublicWorkStore";
import {ViewStore} from "../stores/ViewStore";
import {TypePhotoStore} from "../stores/TypePhotoStore";
import {UserStore} from "../stores/UserStore";
import {StatisticsStore} from "../stores/StatisticsStore";
import {WorkStatusStore} from "../stores/WorkStatusStore";
import {QueueStore} from "../stores/QueueStore";
import {CollectStore} from "../stores/CollectStore";

export const rootContext = React.createContext({
    typeWorkStore: new TypeWorkStore(),
    publicWorkStore: new PublicWorkStore(),
    viewStore: new ViewStore(),
    typePhotoStore: new TypePhotoStore(),
    userStore: new UserStore(),
    statisticsStore: new StatisticsStore(),
    workStatusStore: new WorkStatusStore(),
    queueStore: new QueueStore(),
    collectStore: new CollectStore()
})