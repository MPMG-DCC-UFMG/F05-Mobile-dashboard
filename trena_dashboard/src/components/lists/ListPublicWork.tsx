import {observer} from "mobx-react";
import {useStores} from "../../core/contexts/UseStores";
import React from "react";
import {ItemPublicWork} from "./items/ItemPublicWork";
import {Search} from "../form/Search";
import {ItemActionsMenu} from "../menus/ItemActionsMenu";
import {DeleteView} from "../../screens/views/DeleteView";
import {PublicWork} from "../../core/models/PublicWork";
import {DropdownOptions} from "../form/Dropdown";
import PublicWorkCRUDView from "../../screens/views/publicWork/PublicWorkCRUDView";

export const ListPublicWork = observer(() => {
    const {publicWorkStore, viewStore, typeWorkStore} = useStores()

    const typeWorks = Array<DropdownOptions>()
    typeWorkStore.typeWorksList.forEach(typeWork => {
        if (typeWork.flag) {
            typeWorks.push({key: typeWork.flag.toString(), value: typeWork.name})
        }
    })

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.currentTarget.value
        publicWorkStore.search(query)
    }

    const handleAddClick = () => {
        let mPublicWork = {} as PublicWork
        createPublicWork(
            "Adicionar obra pública",
            "Adicionar",
            () => {
                publicWorkStore.addPublicWork(mPublicWork)
            },
            (publicWork: PublicWork) => {
                mPublicWork = publicWork
            })
    }

    const handleEditClick = () => {
        if (publicWorkStore.selectedPublicWork !== undefined) {
            let mPublicWork = publicWorkStore.selectedPublicWork
            createPublicWork(
                "Editar obra pública",
                "Editar",
                () => {
                    publicWorkStore.updatePublicWork(mPublicWork)
                },
                (publicWork: PublicWork) => {
                    mPublicWork = publicWork
                },
                mPublicWork)
        }
    }

    const createPublicWork = (title: string,
                              confirm: string,
                              onConfirmClick: () => void,
                              onChangePublicWork: (publicWork: PublicWork) => void,
                              defaultPublicWork?: PublicWork
    ) => {
        let publicWorkView = {
            title: title,
            confirmButton: confirm,
            onConfirmClick: onConfirmClick,
            contentView:
                <PublicWorkCRUDView onChangePublicWork={onChangePublicWork}
                                    defaultPublicWork={defaultPublicWork}
                                    typeOfWorkList={typeWorks}/>
        }
        viewStore.setViewInModal(publicWorkView)
    }

    const handleDeleteClick = () => {
        if (publicWorkStore.selectedPublicWork !== undefined) {
            const publicWork = publicWorkStore.selectedPublicWork
            let deleteView = {
                title: "Deletar obra pública",
                confirmButton: "Deletar",
                onConfirmClick: () => {
                    if (publicWork.id) {
                        publicWorkStore.deletePublicWork(publicWork.id)
                    }
                },
                contentView: <DeleteView toDelete={publicWork.name}/>
            }
            viewStore.setViewInModal(deleteView)
        }
    }

    return (
        <>
            <div className="panel">
                <div className="panel-heading">
                    <nav className="level">
                        <div className="level-left">
                            <div className="level-item">
                                Obras Públicas
                            </div>
                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <ItemActionsMenu
                                    itemSelected={publicWorkStore.selectedPublicWork !== undefined}
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