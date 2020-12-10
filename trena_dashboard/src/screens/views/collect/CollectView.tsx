import {observer} from "mobx-react";
import React from "react";
import {useStores} from "../../../core/contexts/UseStores";
import {CollectList} from "./CollectList";
import {Collect} from "../../../core/models/Collect";


export const CollectView: React.FC<any> = observer((props) => {

    const {collectStore} = useStores()

    const handleCollectClicked = (collect: Collect) => {
        collectStore.selectCollect(collect)
    }

    return (
        <div>
            {collectStore.paginatedCollects?.data &&
            <CollectList collects={collectStore.paginatedCollects.data}
                         showPublicWork={true}
                         onCollectClicked={handleCollectClicked}/>
            }
        </div>
    )
})