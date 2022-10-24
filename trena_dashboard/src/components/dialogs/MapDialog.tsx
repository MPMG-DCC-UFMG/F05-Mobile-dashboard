import {
  faCity,
  faHashtag,
  faRoad,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useStores } from "../../core/contexts/UseStores";
import { PublicWork } from "../../core/models/PublicWork";
import { MapView } from "../../screens/views/publicWork/MapView";
import { InfoIconInput } from "../Inputs/InfoIconInput";
import { PublicWorkMenu } from "../Menus/PublicWorkMenu";

interface MapDialogProps {
  state: boolean[];
  setState(state: boolean[]): void;
  publicWork: PublicWork;
  index: number;
}

export function MapDialog({
  state,
  setState,
  publicWork,
  index,
}: MapDialogProps) {
  const handleCloseModal = () =>
    setState(state.map((value, pos) => (pos === index ? false : value)));

  const { publicWorkStore, workStatusStore } = useStores();
  const collectCount = publicWorkStore.collectsOfPublicWork.length;
  const workStateUser = workStatusStore.getWorkStatusByFlag(
    publicWork.type_work_flag
  );
  const workStateIA = publicWork.rnn_status
    ? workStatusStore.getWorkStatusByFlag(publicWork?.rnn_status)
    : null;

  const handleDownloadClick = () => console.log("FVCK CHRISTIAN");

  return (
    <Modal
      backdrop={false}
      size="xl"
      isOpen={state[index]}
      toggle={handleCloseModal}
      unmountOnClose={true}
    >
      <ModalHeader toggle={handleCloseModal}>
        Localização - {publicWork.name}
      </ModalHeader>
      <ModalBody>
        <div style={{ marginBottom: "20px" }}>
          <InfoIconInput
            iconDescription="Cidade"
            width="150px"
            icon={faCity}
            placeholder={publicWork.address.city}
          />
          <br />
          <InfoIconInput
            iconDescription="Bairro"
            width="150px"
            icon={faUsers}
            placeholder={publicWork.address.neighborhood}
          />
          <br />
          <InfoIconInput
            iconDescription="Logradouro"
            width="150px"
            icon={faRoad}
            placeholder={publicWork.address.street}
          />
          <br />
          <InfoIconInput
            iconDescription="Número"
            width="150px"
            icon={faHashtag}
            placeholder={publicWork.address.number}
          />
        </div>
        <MapView
          latitude={publicWork.address.latitude}
          longitude={publicWork.address.longitude}
          zoom={15}
        />
      </ModalBody>
      <ModalFooter>
        <PublicWorkMenu
          collectCount={collectCount}
          workStateUser={workStateUser?.name ? workStateUser.name : "--"}
          workStateIA={workStateIA?.name ? workStateIA.name : "--"}
          onDownloadClicked={collectCount > 0 ? handleDownloadClick : undefined}
        />
      </ModalFooter>
    </Modal>
  );
}
