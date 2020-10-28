import {observer} from "mobx-react";
import {ItemActionsMenu} from "../menus/ItemActionsMenu";
import React from "react";
import {useStores} from "../../core/contexts/UseStores";
import {ItemTypePhoto} from "./items/ItemTypePhoto";
import {Search} from "../form/Search";
import {DeleteView} from "../../views/DeleteView";
import {TypePhoto} from "../../core/models/TypePhoto";
import TypePhotoCRUDView from "../../views/TypePhotoCRUDView";

export const ListTypePhoto = observer(() => {
    const {typePhotoStore, viewStore} = useStores()

    const createTypePhotoView = (title: string,
                                 confirm: string,
                                 onConfirmClick: () => void,
                                 onChangeTypePhoto: (typePhoto: TypePhoto) => void,
                                 defaultTypePhoto?: TypePhoto
    ) => {
        let typePhotoView = {
            title: title,
            confirmButton: confirm,
            onConfirmClick: onConfirmClick,
            contentView:
                <TypePhotoCRUDView onChangeTypePhoto={onChangeTypePhoto}
                                   defaultTypePhoto={defaultTypePhoto}/>
        }
        viewStore.setViewInModal(typePhotoView)
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.currentTarget.value
        typePhotoStore.search(query)
    }

    const handleAddClick = () => {
        let mTypePhoto: TypePhoto = {name: ""}
        createTypePhotoView(
            "Adicionar tipo de foto",
            "Adicionar",
            () => {
                typePhotoStore.addTypePhoto(mTypePhoto)
            },
            (typePhoto: TypePhoto) => {
                mTypePhoto = typePhoto
            })
    }

    const handleEditClick = () => {
        if (typePhotoStore.selectedTypePhoto) {
            let mTypePhoto = typePhotoStore.selectedTypePhoto
            createTypePhotoView(
                "Editar tipo de foto",
                "Editar",
                () => {
                    typePhotoStore.updateTypePhoto(mTypePhoto)
                },
                (typePhoto: TypePhoto) => {
                    mTypePhoto = typePhoto
                },
                mTypePhoto)
        }
    }

    const handleDeleteClick = () => {
        if (typePhotoStore.selectedTypePhoto !== undefined) {
            const typePhoto = typePhotoStore.selectedTypePhoto
            let deleteView = {
                title: "Deletar tipo de foto",
                confirmButton: "Deletar",
                onConfirmClick: () => {
                    if (typePhoto.flag) {
                        typePhotoStore.deleteTypeOfPhoto(typePhoto.flag)
                    }
                },
                contentView: <DeleteView toDelete={typePhoto.name}/>
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
                            Tipos de fotos
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <ItemActionsMenu
                                itemSelected={typePhotoStore.selectedTypePhoto !== undefined}
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
            <div className="panel-block">
                <table className="table is-fullwidth is-hoverable">
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                    </tr>
                    </thead>
                    <tbody>
                    {typePhotoStore.typePhotoList.map(typePhoto => {
                            return <ItemTypePhoto
                                key={typePhoto.flag}
                                typePhoto={typePhoto}/>
                        }
                    )}
                    </tbody>
                </table>
            </div>

        </div>
    )
})