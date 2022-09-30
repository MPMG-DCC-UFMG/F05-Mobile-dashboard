import {observer} from "mobx-react";
import {useStores} from "../../core/contexts/UseStores";
import React, { useState } from 'react';
import {ItemPublicWork} from "./items/ItemPublicWork";
import {Search} from "../form/Search";
import {ItemActionsMenu} from "../menus/ItemActionsMenu";
import {DeleteView} from "../../screens/views/DeleteView";
import {PublicWork} from "../../core/models/PublicWork";
import {DropdownOptions} from "../form/Dropdown";
import PublicWorkCRUDView from "../../screens/views/publicWork/PublicWorkCRUDView";


import { BootstrapTable, SelectRow, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import {
    Row,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Col,
  } from 'reactstrap';



export const ListPublicWork = observer(() => {
    const {publicWorkStore, viewStore, typeWorkStore} = useStores()
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [ status, setStatus] = useState("Todos");
    const toggle = () => setDropdownOpen((prevState) => !prevState);

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

    const onSelect = (row: any, isSelected: boolean, event: any, rowIndex: number) => {
        var selected = publicWorkStore.publicWorkList.filter( item => item.id === row.id)
        publicWorkStore.selectPublicWork(selected[0])
    }


    const addressFormatter = (cell:any, row:any) => {
        console.log(cell);
        console.log(row);
        return row.address.street + ", " + row.address.number +" - " + row.address.city
      }

      
    const selectRowProp:SelectRow = {
        mode: 'radio',
        clickToSelect: true,
        // You can assign className with a string or function
        // String is most easy case but if you want to have more ability to custom the class name
        // you can assign a function
        onSelect: onSelect
      };

      

    return (
        <>
            <div>
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

                <Row>
                   
                        <Dropdown style={{"marginTop": "30px"}} isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle color="primary" caret>{status}</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => setStatus("Todos")}>Todos</DropdownItem>
                                <DropdownItem onClick={() => setStatus("Pendente")}>Pendente</DropdownItem>
                                <DropdownItem onClick={() => setStatus("Com Vistoria")}>Com Vistoria</DropdownItem>
                                <DropdownItem onClick={() => setStatus("Sem Vistoria")}>Sem Vistoria</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    
                </Row>

                <BootstrapTable data={publicWorkStore.publicWorkList} version="4" bordered={ false } hover pagination search selectRow={selectRowProp}>                    
                    <TableHeaderColumn width='300' dataField="name" dataSort>Nome</TableHeaderColumn>
                    <TableHeaderColumn width='400' dataField="address" dataFormat={addressFormatter}>Endereço</TableHeaderColumn>
                    <TableHeaderColumn isKey width='300' dataField="id" dataSort>Id</TableHeaderColumn>
                </BootstrapTable>

            </div>
        </>
    )
})