import {observer} from "mobx-react";
import {ItemActionsMenu} from "../menus/ItemActionsMenu";
import React from "react";
import {useStores} from "../../core/contexts/UseStores";
import {ItemTypePhoto} from "./items/ItemTypePhoto";
import {Search} from "../form/Search";
import {DeleteView} from "../../views/DeleteView";
import {TypePhoto} from "../../core/models/TypePhoto";
import {WorkStatus} from "../../core/models/WorkStatus";
import WorkStatusCRUDView from "../../views/workStatus/WorkStatusCRUDView";

export const ListWorkStatus = observer(() => {
    const {workStatusStore, viewStore} = useStores()

    const createWorkStatusView = (title: string,
                                  confirm: string,
                                  onConfirmClick: () => void,
                                  onChangeWorkStatus: (workStatus: WorkStatus) => void,
                                  defaultWorkStatus?: WorkStatus
    ) => {
        let workStatusView = {
            title: title,
            confirmButton: confirm,
            onConfirmClick: onConfirmClick,
            contentView:
                <WorkStatusCRUDView onChangeWorkStatus={onChangeWorkStatus}
                                    defaultWorkStatus={defaultWorkStatus}/>
        }
        viewStore.setViewInModal(workStatusView)
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.currentTarget.value
        workStatusStore.search(query)
    }

    const handleAddClick = () => {
        let mWorkStatus: WorkStatus = {name: "", description: ""}
        createWorkStatusView(
            "Adicionar estado da obra",
            "Adicionar",
            () => {
                workStatusStore.addWorkStatus(mWorkStatus)
            },
            (typePhoto: TypePhoto) => {
                mWorkStatus = typePhoto
            })
    }

    const handleEditClick = () => {
        if (workStatusStore.selectedWorkStatus) {
            let mWorkStatus = workStatusStore.selectedWorkStatus
            createWorkStatusView(
                "Editar possível estado da obra",
                "Editar",
                () => {
                    workStatusStore.updateWorkStatus(mWorkStatus)
                },
                (workStatus: WorkStatus) => {
                    mWorkStatus = workStatus
                },
                mWorkStatus)
        }
    }

    const handleDeleteClick = () => {
        if (workStatusStore.selectedWorkStatus !== undefined) {
            const mWorkStatus = workStatusStore.selectedWorkStatus
            let deleteView = {
                title: "Deletar tipo de foto",
                confirmButton: "Deletar",
                onConfirmClick: () => {
                    if (mWorkStatus.flag) {
                        workStatusStore.deleteWorkStatus(mWorkStatus.flag)
                    }
                },
                contentView: <DeleteView toDelete={mWorkStatus.name}/>
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
                            Estados das obras
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <ItemActionsMenu
                                itemSelected={workStatusStore.selectedWorkStatus !== undefined}
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
                    {workStatusStore.workStatusList.map(workStatus => {
                            return <ItemTypePhoto
                                key={workStatus.flag}
                                typePhoto={workStatus}/>
                        }
                    )}
                    </tbody>
                </table>
            </div>

        </div>
    )
})