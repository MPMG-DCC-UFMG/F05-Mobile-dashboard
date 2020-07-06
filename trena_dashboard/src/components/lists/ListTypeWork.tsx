import {observer} from "mobx-react";
import {useStores} from "../../core/stores/UseStores";
import React from "react";
import {ItemTypeWork} from "../items/ItemTypeWork";
import {Search} from "../base/Search";

export const ListTypeWork = observer(() => {
    const {typeWorkStore} = useStores()

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.currentTarget.value
        typeWorkStore.search(query)
    }

    return (
        <>
            <div className="panel">
                <p className="panel-heading">
                    Tipos de Obras
                </p>
                <div className="panel-block">
                    <Search onTextChanged={handleSearch}/>
                </div>
                {typeWorkStore.typeWorksList.map(typeWork => {
                        return <ItemTypeWork
                            key={typeWork.flag}
                            flag={typeWork.flag}
                            name={typeWork.name}/>
                    }
                )}
            </div>
        </>
    )
})