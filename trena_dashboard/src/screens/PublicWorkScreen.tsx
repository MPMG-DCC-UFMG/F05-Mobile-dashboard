import React from "react";
import {ListPublicWork} from "../components/lists/ListPublicWork";
import {useStores} from "../core/contexts/UseStores";
import {PublicWorkView} from "../views/publicWork/PublicWorkView";

interface PublicWorkScreenProps {

}

export const PublicWorkScreen: React.FC<PublicWorkScreenProps> = (props) => {
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