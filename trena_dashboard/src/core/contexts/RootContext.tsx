import {TypeWorkStore} from "../stores/TypeWorkStore";
import React from "react";


export const rootContext = React.createContext({
    typeWorkStore: new TypeWorkStore(),
})