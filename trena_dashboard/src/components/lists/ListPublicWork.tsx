import { observer } from "mobx-react";
import React, { Fragment, useEffect, useState } from "react";
import { useStores } from "../../core/contexts/UseStores";
import { PublicWork } from "../../core/models/PublicWork";
import { DeleteView } from "../../screens/views/DeleteView";
import PublicWorkCRUDView from "../../screens/views/publicWork/PublicWorkCRUDView";
import { DropdownOptions } from "../Form/Dropdown";
import { ItemActionsMenu } from "../Menus/ItemActionsMenu";

import { faEye, faMap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SelectRow } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap";
import { Address } from "../../core/models/Address";
import { MapDialog } from "../Dialogs/MapDialog";

export const ListPublicWork = observer(() => {
  const { publicWorkStore, viewStore, typeWorkStore } = useStores();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [status, setStatus] = useState("Todos");
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const typeWorks = Array<DropdownOptions>();
  typeWorkStore.typeWorksList.forEach((typeWork) => {
    if (typeWork.flag) {
      typeWorks.push({ key: typeWork.flag.toString(), value: typeWork.name });
    }
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value;
    publicWorkStore.search(query);
  };

  const handleAddClick = () => {
    let mPublicWork = {} as PublicWork;
    createPublicWork(
      "Adicionar obra pública",
      "Adicionar",
      () => {
        publicWorkStore.addPublicWork(mPublicWork);
      },
      (publicWork: PublicWork) => {
        mPublicWork = publicWork;
      }
    );
  };

  const handleEditClick = () => {
    if (publicWorkStore.selectedPublicWork !== undefined) {
      let mPublicWork = publicWorkStore.selectedPublicWork;
      createPublicWork(
        "Editar obra pública",
        "Editar",
        () => {
          publicWorkStore.updatePublicWork(mPublicWork);
        },
        (publicWork: PublicWork) => {
          mPublicWork = publicWork;
        },
        mPublicWork
      );
    }
  };

  const createPublicWork = (
    title: string,
    confirm: string,
    onConfirmClick: () => void,
    onChangePublicWork: (publicWork: PublicWork) => void,
    defaultPublicWork?: PublicWork
  ) => {
    let publicWorkView = {
      title: title,
      confirmButton: confirm,
      onConfirmClick: onConfirmClick,
      contentView: (
        <PublicWorkCRUDView
          onChangePublicWork={onChangePublicWork}
          defaultPublicWork={defaultPublicWork}
          typeOfWorkList={typeWorks}
        />
      ),
    };
    viewStore.setViewInModal(publicWorkView);
  };

  const handleDeleteClick = () => {
    if (publicWorkStore.selectedPublicWork !== undefined) {
      const publicWork = publicWorkStore.selectedPublicWork;
      let deleteView = {
        title: "Deletar obra pública",
        confirmButton: "Deletar",
        onConfirmClick: () => {
          if (publicWork.id) {
            publicWorkStore.deletePublicWork(publicWork.id);
          }
        },
        contentView: <DeleteView toDelete={publicWork.name} />,
      };
      viewStore.setViewInModal(deleteView);
    }
  };

  const onSelect = (
    row: any,
    isSelected: boolean,
    event: any,
    rowIndex: number
  ) => {
    var selected = publicWorkStore.publicWorkList.filter(
      (item) => item.id === row.id
    );
    publicWorkStore.selectPublicWork(selected[0]);
  };

  const addressFormatter = (cell: any, row: any) => {
    console.log(cell);
    console.log(row);
    return (
      row.address.street + ", " + row.address.number + " - " + row.address.city
    );
  };

  const selectRowProp: SelectRow = {
    mode: "radio",
    clickToSelect: true,
    // You can assign className with a string or function
    // String is most easy case but if you want to have more ability to custom the class name
    // you can assign a function
    onSelect: onSelect,
  };

  const [openLocalizationModal, setOpenLocalizationModal] = useState(
    Array(publicWorkStore.publicWorkList.length).fill(false)
  );
  const [openInspectionsModal, setOpenInspectionsModal] = useState(
    Array(publicWorkStore.publicWorkList.length).fill(false)
  );
  const handleOpenLocalizationModal = (index: number) =>
    setOpenLocalizationModal(
      openInspectionsModal.map((value, pos) => (index === pos ? true : value))
    );
  const handleOpenInspectionsModal = (index: number) =>
    setOpenInspectionsModal(
      openInspectionsModal.map((value, pos) => (index === pos ? true : value))
    );

  const newAddressFormatter = (adress: Address) =>
    `${adress.street}, ${adress.number} - ${adress.city}`;

  useEffect(() => {
    setOpenInspectionsModal(
      Array(publicWorkStore.publicWorkList.length).fill(false)
    );
    setOpenLocalizationModal(
      Array(publicWorkStore.publicWorkList.length).fill(false)
    );
  }, [publicWorkStore.publicWorkList]);
  return (
    <>
      <div>
        <div className="panel-heading">
          <nav className="level">
            <div className="level-left">
              <div className="level-item">Obras Públicas</div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <ItemActionsMenu
                  itemSelected={
                    publicWorkStore.selectedPublicWork !== undefined
                  }
                  onAddClicked={handleAddClick}
                  onDeleteClicked={handleDeleteClick}
                  onEditClicked={handleEditClick}
                />
              </div>
            </div>
          </nav>
        </div>

        <Row>
          <Dropdown
            style={{ marginTop: "30px" }}
            isOpen={dropdownOpen}
            toggle={toggle}
          >
            <DropdownToggle color="primary" caret>
              {status}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => setStatus("Todos")}>
                Todos
              </DropdownItem>
              <DropdownItem onClick={() => setStatus("Pendente")}>
                Pendente
              </DropdownItem>
              <DropdownItem onClick={() => setStatus("Com Vistoria")}>
                Com Vistoria
              </DropdownItem>
              <DropdownItem onClick={() => setStatus("Sem Vistoria")}>
                Sem Vistoria
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Row>

        <div className="panel-block">
          <table className="table is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th align="left">Nome</th>
                <th align="left">Endereço</th>
                <th align="left">Id</th>
                <th align="center">Localização</th>
                <th align="center">Vistorias</th>
              </tr>
            </thead>
            <tbody>
              {publicWorkStore.publicWorkList.map((publicWork, index) => (
                <Fragment key={publicWork.id}>
                  <tr>
                    <td>{publicWork.name}</td>
                    <td>{newAddressFormatter(publicWork.address)}</td>
                    <td>{publicWork.id}</td>
                    <td>
                      <button
                        style={{ background: "transparent", border: "none" }}
                        onClick={() => handleOpenLocalizationModal(index)}
                      >
                        <span>
                          <FontAwesomeIcon color="green" icon={faMap} />
                        </span>
                      </button>
                    </td>
                    <td>
                      <button
                        style={{ background: "transparent", border: "none" }}
                        onClick={() => handleOpenLocalizationModal(index)}
                      >
                        <span>
                          <FontAwesomeIcon color="gray" icon={faEye} />
                        </span>
                      </button>
                    </td>
                  </tr>
                  <MapDialog
                    state={openLocalizationModal}
                    setState={setOpenLocalizationModal}
                    publicWork={publicWork}
                    index={index}
                  />
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
});
