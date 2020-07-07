import {observer} from "mobx-react";
import {useStores} from "../../../core/stores/UseStores";
import React from "react";
import {ItemPublicWork} from "./items/ItemPublicWork";
import {Search} from "../base/Search";

export const ListPublicWork = observer(() => {
    const {publicWorkStore} = useStores()

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.currentTarget.value
        publicWorkStore.search(query)
    }

    return (
        <>
            <div className="panel">
                <p className="panel-heading">
                    Lista de Obras Públicas
                </p>
                <div className="panel-block">
                    <Search onTextChanged={handleSearch}/>
                </div>
                {publicWorkStore.publicWorkList.map(publicWork => {
                        return <ItemPublicWork
                            key={publicWork.id}
                            publicWork={publicWork}
                        />
                    }
                )}
            </div>
        </>
    )
})