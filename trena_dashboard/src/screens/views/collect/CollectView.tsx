import {observer} from "mobx-react";
import React from "react";
import {useStores} from "../../../core/contexts/UseStores";
import {CollectList} from "./CollectList";
import {Collect} from "../../../core/models/Collect";
import {InputField} from "../../../components/form/InputField";


export const CollectView: React.FC<any> = observer((props) => {

    const {collectStore} = useStores()

    const handleCollectClicked = (collect: Collect) => {
        collectStore.selectCollect(collect)
    }

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        const value = event.target.value
    }

    return (
        <div>
            {/*<div className="container has-text-left">*/}
            {/*    <InputField*/}
            {/*        inputLabel="ID da obra"*/}
            {/*        inputHint="Filtrar por ID da obra pública"*/}
            {/*        inputName="publicWorkId"*/}
            {/*        onValueChanged={handleFormChange}/>*/}
            {/*</div>*/}
            {collectStore.paginatedCollects?.data &&
            <CollectList collects={collectStore.paginatedCollects.data}
                         showPublicWork={true}
                         onCollectClicked={handleCollectClicked}/>
            }
        </div>
    )
})