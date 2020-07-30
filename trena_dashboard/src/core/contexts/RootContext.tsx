import {TypeWorkStore} from "../stores/TypeWorkStore";
import React from "react";
import {PublicWorkStore} from "../stores/PublicWorkStore";
import {ViewStore} from "../stores/ViewStore";
import {TypePhotoStore} from "../stores/TypePhotoStore";
import {UserStore} from "../stores/UserStore";


export const rootContext = React.createContext({
    typeWorkStore: new TypeWorkStore(),
    publicWorkStore: new PublicWorkStore(),
    viewStore: new ViewStore(),
    typePhotoStore: new TypePhotoStore(),
    userStore: new UserStore()
})