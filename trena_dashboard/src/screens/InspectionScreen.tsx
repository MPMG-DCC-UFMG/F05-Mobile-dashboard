import React from "react";
import {CollectView} from "./views/collect/CollectView";
import {useStores} from "../core/contexts/UseStores";
import {observer} from "mobx-react";
import {PhotoView} from "./views/photo/PhotoView";
import {ListInspection} from "../components/lists/ListInspection";

export const InspectionScreen: React.FC<any> = observer((props) => {

    const {inspectionStore} = useStores()
    inspectionStore.loadInspections()

    return (
        <div className="columns">
            <div className="column is-two-thirds">
                <ListInspection/>
            </div>
            <div className="column">
            </div>
        </div>
    )
})