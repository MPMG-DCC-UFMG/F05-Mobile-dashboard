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
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useStores } from "../../../core/contexts/UseStores";
import { TypeWork } from "../../../core/models/TypeWork";
import { InfoTextField } from "../../Inputs/InfoTextField";
import {
  SingleDialogContainer,
  SingleDialogContainerProps,
} from "../DialogContainer";

export function AddPublicWorkDialog({
  state,
  setState,
  title,
}: SingleDialogContainerProps) {
  const { typeWorkStore, publicWorkStore } = useStores();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [cep, setCep] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [typeWorks] = useState(typeWorkStore.typeWorksList);
  const [selectedTypeWork, setSelectedTypeWork] = useState<TypeWork | null>(
    null
  );

  const handleSubmitPublicWork = () => {
    publicWorkStore.addPublicWork({
      name: name,
      type_work_flag: selectedTypeWork?.flag!,
      id: "6",
      address: {
        cep,
        city,
        latitude,
        longitude,
        neighborhood,
        number,
        state: "MG",
        street,
        id: "645",
        public_work_id: "6",
      },
    });
  };

  return (
    <SingleDialogContainer state={state} setState={setState} title={title}>
      <InfoTextField
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
        onChange={(e, value) => setSelectedTypeWork(value)}
      />
      <Accordion sx={{ width: "100%", mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Endereço</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <InfoTextField
            fullWidth
            icon={<LocationCity />}
            label="Cidade"
            defaultValue={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <InfoTextField
            fullWidth
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
            defaultValue={neighborhood}
            icon={<HolidayVillage />}
            label="Bairro"
            onChange={(e) => setNeighborhood(e.target.value)}
          />
          <InfoTextField
            fullWidth
            defaultValue={street}
            icon={<NearMe />}
            label="Rua"
            onChange={(e) => setStreet(e.target.value)}
          />
          <InfoTextField
            fullWidth
            defaultValue={number}
            icon={<Numbers />}
            label="Logradouro"
            onChange={(e) => setNumber(e.target.value)}
          />
          <InfoTextField
            fullWidth
            defaultValue={latitude.toString()}
            icon={<Numbers />}
            label="Latitude"
            onChange={(e) => setLatitude(Number(e.target.value))}
          />
          <InfoTextField
            fullWidth
            defaultValue={longitude.toString()}
            icon={<Numbers />}
            label="Longitude"
            onChange={(e) => setLongitude(Number(e.target.value))}
          />
        </AccordionDetails>
      </Accordion>
      <Grid sx={{ mt: 2 }} item display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmitPublicWork}
        >
          Salvar
        </Button>
      </Grid>
    </SingleDialogContainer>
  );
}
