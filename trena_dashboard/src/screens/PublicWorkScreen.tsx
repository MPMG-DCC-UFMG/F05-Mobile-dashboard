import React from "react";
import {ListPublicWork} from "../components/lists/ListPublicWork";
import {useStores} from "../core/stores/UseStores";
import {PublicWorkView} from "../views/PublicWorkView";

interface PublicWorkScreen {

}

export const ScreenPublicWork: React.FC<PublicWorkScreen> = (props) => {
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