import {observer} from "mobx-react";
import {useStores} from "../../core/contexts/UseStores";
import React from "react";
import {ItemTypeWork} from "./items/ItemTypeWork";
import {Search} from "../form/Search";
import {ItemActionsMenu} from "../menus/ItemActionsMenu";
import {DeleteView} from "../../screens/views/DeleteView";
import TypeWorkCRUDView from "../../screens/views/typeWork/TypeWorkCRUDView";
import {TypeWork} from "../../core/models/TypeWork";

export const ListTypeWork = observer(() => {
    const {typeWorkStore, viewStore} = useStores()

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.currentTarget.value
        typeWorkStore.search(query)
    }

    const handleAddClick = () => {
        let mTypeWork: TypeWork = {name: "", status_list: []}
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
                <TypeWorkCRUDView onChangeTypeWork={onChangeTypeWork}
                                  defaultTypeWork={defaultTypeWork}/>
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
        <div className="panel">
            <div className="panel-heading">
                <nav className="level">
                    <div className="level-left">
                        <div className="level-item">
                            Tipos de Obras
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <ItemActionsMenu
                                itemSelected={typeWorkStore.selectedTypeWork !== undefined}
                                onAddClicked={handleAddClick}
                                onDeleteClicked={handleDeleteClick}
                                onEditClicked={handleEditClick}/>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="panel-block">
                <Search onTextChanged={handleSearch}/>
            </div>
            {typeWorkStore.typeWorksList.map(typeWork => {
                    return <ItemTypeWork
                        key={typeWork.flag}
                        typeWork={typeWork}/>
                }
            )}
        </div>
    )
})