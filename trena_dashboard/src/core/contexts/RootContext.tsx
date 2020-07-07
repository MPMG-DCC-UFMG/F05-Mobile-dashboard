import {TypeWorkStore} from "../stores/TypeWorkStore";
import React from "react";
import {PublicWorkStore} from "../stores/PublicWorkStore";


export const rootContext = React.createContext({
    typeWorkStore: new TypeWorkStore(),
    publicWorkStore: new PublicWorkStore()
})