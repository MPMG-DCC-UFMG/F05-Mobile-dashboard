import {observer} from "mobx-react";
import {useStores} from "../../../core/stores/UseStores";
import React from "react";
import {ItemTypeWork} from "./items/ItemTypeWork";
import {Search} from "../base/Search";
import {ItemActionsMenu} from "../menus/ItemActionsMenu";
import {DeleteView} from "../views/DeleteView";
import {TypeWorkView} from "../views/TypeWorkView";
import {TypeWork} from "../../../core/models/TypeWork";

export const ListTypeWork = observer(() => {
    const {typeWorkStore, viewStore} = useStores()

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.currentTarget.value
        typeWorkStore.search(query)
    }

    const handleAddClick = () => {
        let mTypeWork: TypeWork = {name: ""}
        createTypeWorkView(
            "Adicionar tipo de obra",
            "Adicionar",
            () => {
                typeWorkStore.addTypeWork(mTypeWork)
            },
            (typeWork: TypeWork) => {
                mTypeWork = typeWork
            })
    }

    const createTypeWorkView = (title: string,
                                confirm: string,
                                onConfirmClick: () => void,
                                onChangeTypeWork: (typeWork: TypeWork) => void,
                                defaultTypeWork?: TypeWork
    ) => {
        let typeWorkView = {
            title: title,
            confirmButton: confirm,
            onConfirmClick: onConfirmClick,
            contentView:
                <TypeWorkView onChangeTypeWork={onChangeTypeWork} defaultTypeWork={defaultTypeWork}/>
        }
        viewStore.setViewInModal(typeWorkView)
    }

    const handleEditClick = () => {
        if (typeWorkStore.selectedTypeWork) {
            let mTypeWork = typeWorkStore.selectedTypeWork
            createTypeWorkView(
                "Editar tipo de obra",
                "Editar",
                () => {
                    typeWorkStore.updateTypeWork(mTypeWork)
                },
                (typeWork: TypeWork) => {
                    mTypeWork = typeWork
                },
                mTypeWork)
        }
    }

    const handleDeleteClick = () => {
        if (typeWorkStore.selectedTypeWork !== undefined) {
            const typeWork = typeWorkStore.selectedTypeWork
            let deleteView = {
                title: "Deletar Tipo de Obra",
                confirmButton: "Deletar",
                onConfirmClick: () => {
                    if (typeWork.flag) {
                        typeWorkStore.deleteTypeOfWork(typeWork.flag)
                    }
                },
                contentView: <DeleteView toDelete={typeWork.name}/>
            }
            viewStore.setViewInModal(deleteView)
        }
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