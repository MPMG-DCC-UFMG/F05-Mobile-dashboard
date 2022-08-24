import {observer} from "mobx-react";
import {ItemActionsMenu} from "../menus/ItemActionsMenu";
import React from "react";
import {useStores} from "../../core/contexts/UseStores";
import {ItemInspection} from "./items/ItemInspection";
import {Search} from "../form/Search";
import {DeleteView} from "../../screens/views/DeleteView";
import {Inspection} from "../../core/models/Inspection";
import InspectionCRUDView from "../../screens/views/inspections/InspectionCRUDView";
import InspectionStatusView from "../../screens/views/inspections/InspectionStatusView";

export const ListInspection = observer(() => {
    const {inspectionStore, viewStore} = useStores()

    const createInspectionView = (title: string,
        confirm: string,
        onConfirmClick: () => void,
        onChangeInspection: (inspection:Inspection) => void,
        defaultInspection?: Inspection
    ) => {
        let inspectionView = {
            title: title,
            confirmButton: confirm,
            onConfirmClick: onConfirmClick,
            contentView: <InspectionCRUDView onChangeInspection={onChangeInspection}
                    defaultInspection={defaultInspection}/>
        }
        viewStore.setViewInModal(inspectionView)
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.currentTarget.value
        inspectionStore.search(query)
    }

    const handleAddClick = () => {
        let mInspection: Inspection = {name: ""}
        createInspectionView(
            "Adicionar Vistoria",
            "Adicionar",
            () => {
                mInspection.status = 0
                inspectionStore.addInspection(mInspection) 
            },
            (inspection:Inspection) => {
                mInspection = inspection
            })
    }

    const handleEditClick = () => {        
        viewStore.setViewInModal({
            title: "Mudar Status",
            confirmButton: "Alterar",
            onConfirmClick: () => {
                var inspection = inspectionStore.selectedInspection
                if(inspection != null) {
                    inspectionStore.updateInspection(inspection)
                }
            },
            contentView: <InspectionStatusView onChangeState={(key?:string) => {        
                var inspection = inspectionStore.selectedInspection
                if (inspection != null && key != null){
                    inspection.status = parseInt(key)
                    
                }
            }}/>
        })
    }

    const handleDeleteClick = () => {
        
    }

    return (
        <div className="panel">
            <div className="panel-heading">
                <nav className="level">
                    <div className="level-left">
                        <div className="level-item">
                            Vistorias
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <ItemActionsMenu
                                itemSelected={inspectionStore.selectedInspection !== undefined}
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
                        <th>ID Obra Pública</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {inspectionStore.inspectionList.map(inspection => {
                            return <ItemInspection
                                key={inspection.flag}
                                inspection={inspection}/>
                        }
                    )}
                    </tbody>
                </table>
            </div>

        </div>
    )
})