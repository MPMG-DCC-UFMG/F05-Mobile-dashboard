import React from "react";
import {CollectView} from "./views/collect/CollectView";
import {useStores} from "../core/contexts/UseStores";
import {observer} from "mobx-react";
import {PhotoView} from "./views/photo/PhotoView";

export const CollectScreen: React.FC<any> = observer((props) => {

    const {collectStore} = useStores()

    collectStore.loadCollects()

    return (
        <div>
            {collectStore.selectedCollect ?
                <PhotoView photos={collectStore.selectedCollect.photos}/>
                :
                <CollectView showPublicWork={true}/>
            }
        </div>
    )
})