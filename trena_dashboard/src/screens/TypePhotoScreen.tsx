import React from "react";
import {useStores} from "../core/contexts/UseStores";
import {ListTypePhoto} from "../components/lists/ListTypePhoto";

export const TypePhotoScreen: React.FC<any> = (props) => {
    const {typePhotoStore} = useStores()
    typePhotoStore.loadTypePhotoList()

    return (
        <div className="columns">
            <div className="column is-two-thirds">
                <ListTypePhoto/>
            </div>
            <div className="column">
            </div>
        </div>
    )
}