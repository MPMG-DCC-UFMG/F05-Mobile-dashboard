import { Public } from "@material-ui/icons";
import {
  ExpandMore,
  HolidayVillage,
  LocationCity,
  LocationOn,
  NearMe,
  Numbers,
  TextFields,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useStores } from "../../../core/contexts/UseStores";
import { InfoTextField } from "../../Inputs/InfoTextField";
import { TableDialogContainer, TableDialogProps } from "../DialogContainer";

import { useMutation } from "react-query";
import { PublicWork } from "../../../core/models/PublicWork";
import { PublicWorkServiceQuery } from "../../../core/network/services/PublicWorkService";
import { WarningField } from "../../WarningField";

interface HandlePublicWorkDialogProps extends TableDialogProps {
  mode: "edit" | "delete";
  publicWork: PublicWork;
}

export function HandlePublicWorkDialog({
  state,
  setState,
  title,
  index,
  mode,
  publicWork,
  fullScreen,
}: HandlePublicWorkDialogProps) {
  const { typeWorkStore } = useStores();
  const [name, setName] = useState(publicWork.name);
  const [city, setCity] = useState(publicWork.address.city);
  const [cep, setCep] = useState(publicWork.address.cep);
  const [neighborhood, setNeighborhood] = useState(
    publicWork.address.neighborhood
  );
  const [street, setStreet] = useState(publicWork.address.street);
  const [number, setNumber] = useState(publicWork.address.number);
  const [latitude, setLatitude] = useState(publicWork.address.latitude);
  const [longitude, setLongitude] = useState(publicWork.address.longitude);
  const [typeWorks] = useState(typeWorkStore.typeWorksList);
  const [selectedTypeWork, setSelectedTypeWork] = useState<number>(
    publicWork.type_work_flag
  );
  const [errorWarning, setErrorWarning] = useState(false);
  const [successWaning, setSuccessWarning] = useState(false);

  const { mutate: editMutate, isLoading: editLoading } = useMutation(
    PublicWorkServiceQuery.updatePublicWork
  );

  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation(
    PublicWorkServiceQuery.deletePublicWork
  );

  const handleSubmitChanges = () => {
    mode === "edit"
      ? editMutate(
          {
            name: name,
            type_work_flag: selectedTypeWork,
            id: publicWork.id,
            address: {
              cep,
              city,
              latitude,
              longitude,
              neighborhood,
              number,
              state: "MG",
              street,
              id: publicWork.address.id,
              public_work_id: publicWork.id,
            },
          },
          {
            onError: () => setErrorWarning(true),
            onSuccess: () => setSuccessWarning(true),
          }
        )
      : deleteMutate(publicWork.id, {
          onError: () => setErrorWarning(true),
          onSuccess: () => setSuccessWarning(true),
        });
  };

  return (
    <TableDialogContainer
      fullScreen={fullScreen}
      state={state}
      setState={setState}
      title={title}
      index={index}
    >
      <InfoTextField
        disabled={mode === "delete"}
        label="Nome"
        fullWidth
        defaultValue={name}
        onChange={(e) => setName(e.target.value)}
        icon={<TextFields />}
      />
      <Autocomplete
        sx={{ mt: 2 }}
        disablePortal
        fullWidth
        renderInput={(params) => <TextField {...params} label="Tipo de Obra" />}
        getOptionLabel={(option) => option.name}
        options={typeWorks}
        onChange={(e, value) =>
          setSelectedTypeWork(value ? value.flag! : publicWork.type_work_flag)
        }
      />
      <Accordion sx={{ width: "100%", mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Endereço</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <InfoTextField
            fullWidth
            disabled={mode === "delete"}
            icon={<LocationCity />}
            label="Cidade"
            defaultValue={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <InfoTextField
            fullWidth
            disabled={mode === "delete"}
            icon={<Public />}
            label="CEP"
            defaultValue={cep}
            onChange={(e) => setCep(e.target.value)}
          />
          <InfoTextField
            fullWidth
            disabled
            value="MG"
            icon={<LocationOn />}
            label="UF"
          />
          <InfoTextField
            fullWidth
            disabled={mode === "delete"}
            defaultValue={neighborhood}
            icon={<HolidayVillage />}
            label="Bairro"
            onChange={(e) => setNeighborhood(e.target.value)}
          />
          <InfoTextField
            fullWidth
            disabled={mode === "delete"}
            defaultValue={street}
            icon={<NearMe />}
            label="Rua"
            onChange={(e) => setStreet(e.target.value)}
          />
          <InfoTextField
            fullWidth
            disabled={mode === "delete"}
            defaultValue={number}
            icon={<Numbers />}
            label="Logradouro"
            onChange={(e) => setNumber(e.target.value)}
          />
          <InfoTextField
            fullWidth
            disabled={mode === "delete"}
            defaultValue={latitude.toString()}
            icon={<Numbers />}
            label="Latitude"
            onChange={(e) => setLatitude(Number(e.target.value))}
          />
          <InfoTextField
            fullWidth
            disabled={mode === "delete"}
            defaultValue={longitude.toString()}
            icon={<Numbers />}
            label="Longitude"
            onChange={(e) => setLongitude(Number(e.target.value))}
          />
        </AccordionDetails>
      </Accordion>
      <Grid sx={{ mt: 2 }} item display="flex" justifyContent="flex-end">
        {mode === "edit" ? (
          <Button
            disabled={editLoading || successWaning}
            variant="contained"
            color="success"
            onClick={handleSubmitChanges}
          >
            {editLoading ? <CircularProgress /> : "Salvar"}
          </Button>
        ) : (
          <Button
            disabled={deleteLoading || successWaning}
            variant="contained"
            color="error"
            onClick={handleSubmitChanges}
          >
            {editLoading ? <CircularProgress /> : "Deletar"}
          </Button>
        )}
      </Grid>
      {successWaning && (
        <WarningField
          title="Ação realizada com sucesso!"
          message={`A Obra ${name}, de ID ${publicWork.id} foi ${
            mode === "edit" ? "editada" : "deletada"
          } com sucesso!`}
          severity="success"
        />
      )}
      {errorWarning && (
        <WarningField
          title="Falha ao realizar ação!"
          message={`Verifique a integridade dos dados ou do servidor!`}
          severity="error"
        />
      )}
    </TableDialogContainer>
  );
}
