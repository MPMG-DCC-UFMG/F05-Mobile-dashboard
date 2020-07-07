import {observer} from "mobx-react";
import {useStores} from "../../../core/stores/UseStores";
import React from "react";
import {ItemTypeWork} from "./items/ItemTypeWork";
import {Search} from "../base/Search";
import {ItemActionsMenu} from "../menus/ItemActionsMenu";

export const ListTypeWork = observer(() => {
    const {typeWorkStore} = useStores()

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.currentTarget.value
        typeWorkStore.search(query)
    }

    const handleAddClick = () => {
        console.log("Add clicked")
    }

    const handleEditClick = () => {
        console.log("Edit clicked")
    }

    const handleDeleteClick = () => {
        console.log("Delete clicked")
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
                <div className="panel-block">
                    <ItemActionsMenu
                        itemSelected={typeWorkStore.selectedTypeWork !== undefined}
                        onAddClicked={handleAddClick}
                        onDeleteClicked={handleDeleteClick}
                        onEditClicked={handleEditClick}/>
                </div>
                {typeWorkStore.typeWorksList.map(typeWork => {
                        return <ItemTypeWork
                            key={typeWork.flag}
                            typeWork={typeWork}/>
                    }
                )}
            </div>
        </>
    )
})