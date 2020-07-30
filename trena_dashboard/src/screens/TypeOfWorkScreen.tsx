import React from "react";
import {ListTypeWork} from "../components/lists/ListTypeWork";
import {useStores} from "../core/stores/UseStores";
import {ListTypePhoto} from "../components/lists/ListTypePhoto";


interface ScreenTypeOfWorkProps {

}

export const TypeOfWorkScreen: React.FC<ScreenTypeOfWorkProps> = (props) => {
    const {typeWorkStore, typePhotoStore} = useStores()
    typeWorkStore.loadTypeWorkList()
    typePhotoStore.loadTypePhotoList()

    return (
        <div className="columns">
            <div className="column is-one-third">
                <ListTypeWork/>
            </div>
            <div className="column">
                <ListTypePhoto/>
            </div>
        </div>
    )
}