import {TypeWorkStore} from "../stores/TypeWorkStore";
import React from "react";
import {PublicWorkStore} from "../stores/PublicWorkStore";
import {ViewStore} from "../stores/ViewStore";


export const rootContext = React.createContext({
    typeWorkStore: new TypeWorkStore(),
    publicWorkStore: new PublicWorkStore(),
    viewStore: new ViewStore(),
})