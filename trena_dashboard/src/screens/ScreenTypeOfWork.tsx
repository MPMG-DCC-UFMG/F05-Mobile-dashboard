import React from "react";
import {ListTypeWork} from "../components/lists/ListTypeWork";
import {useStores} from "../core/stores/UseStores";

interface ScreenTypeOfWorkProps {

}

export const ScreenTypeOfWork: React.FC<ScreenTypeOfWorkProps> = (props) => {
    const {typeWorkStore} = useStores()
    typeWorkStore.loadTypeWorkList()

    return (
        <div className="columns">
            <div className="column is-one-fifth">
                <ListTypeWork/>
            </div>

        </div>
    )
}