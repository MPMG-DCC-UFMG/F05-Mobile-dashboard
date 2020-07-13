import React from "react";
import {ListPublicWork} from "./components/lists/ListPublicWork";
import {useStores} from "../core/stores/UseStores";
import {PublicWorkView} from "./components/views/PublicWorkView";

interface ScreenPublicWork {

}

export const ScreenPublicWork: React.FC<ScreenPublicWork> = (props) => {
    const {publicWorkStore,typeWorkStore} = useStores()
    publicWorkStore.loadPublicWorkList()
    typeWorkStore.loadTypeWorkList()
    return (
        <div className="columns">
            <div className="column is-one-third">
                <ListPublicWork/>
            </div>
            <div className="column is-two-thirds">
                <PublicWorkView/>
            </div>
        </div>
    )
}