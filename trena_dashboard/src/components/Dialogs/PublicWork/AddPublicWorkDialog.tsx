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
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { TypeWork } from "../../../core/models/TypeWork";
import { InfoTextField } from "../../Inputs/InfoTextField";
import {
  SingleDialogContainer,
  SingleDialogContainerProps,
} from "../DialogContainer";

import CSVReader from "react-csv-reader";
import { useMutation, useQuery } from "react-query";
import uuid from "react-uuid";
import * as XLSX from "xlsx";
import { Address } from "../../../core/models/Address";
import { PublicWorkServiceQuery } from "../../../core/network/services/PublicWorkService";
import { TypeWorkServiceQuery } from "../../../core/network/services/TypeWorkService";
import { WarningField } from "../../WarningField";

export function AddPublicWorkDialog({
  state,
  setState,
  title,
  fullScreen,
}: SingleDialogContainerProps) {
  const { data: typeWorks } = useQuery<TypeWork[]>(["getTypeWorks"], () =>
    TypeWorkServiceQuery.loadTypeWorks()
  );
  const [address, setAddress] = useState<Address>({} as Address);

  const [inputMode, setInputMode] = useState<string>("Manual");
  const [name, setName] = useState("");
  const [selectedTypeWork, setSelectedTypeWork] = useState<TypeWork | null>(
    null
  );
  const [errorWarning, setErrorWarning] = useState(false);
  const [successWaning, setSuccessWarning] = useState(false);

  const { mutate, isLoading } = useMutation(
    PublicWorkServiceQuery.addPublicWork
  );

  const handleSubmitPublicWork = () => {
    const id = uuid();
    const addressId = uuid();
    mutate(
      {
        name: name,
        type_work_flag: selectedTypeWork?.flag!,
        id: id,
        address: {
          ...address,
          id: addressId,
        },
      },
      {
        onError: () => setErrorWarning(true),
        onSuccess: () => setSuccessWarning(true),
      }
    );
  };

  const handleChangeActive = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;

    if (value === null) {
      setInputMode("Manual");
    }

    setInputMode(value);
  };

  const handleReadXLSX = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = e.target.files,
        f = files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target!.result;
        let readedData = XLSX.read(data, { type: "binary" });
        const wsname = readedData.SheetNames[0];
        const ws = readedData.Sheets[wsname];

        const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
        console.log(dataParse);
      };
      reader.readAsBinaryString(f);
    }
  };

  return (
    <SingleDialogContainer
      fullScreen={inputMode === "Manual"}
      state={state}
      setState={setState}
      title={title}
    >
      <FormControl>
        <FormLabel>Maneira de Cadastro</FormLabel>
        <RadioGroup row onChange={handleChangeActive}>
          <FormControlLabel value="Manual" control={<Radio />} label="Manual" />
          <FormControlLabel value="CSV" control={<Radio />} label="CSV" />
          <FormControlLabel value="XLSX" control={<Radio />} label="XLSX" />
        </RadioGroup>
      </FormControl>
      {inputMode === "Manual" && (
        <>
          <InfoTextField
            label="Nome"
            fullWidth
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
            icon={<TextFields />}
          />
          {typeWorks && (
            <Autocomplete
              sx={{ mt: 2 }}
              disablePortal
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="Tipo de Obra" />
              )}
              getOptionLabel={(option) => option.name}
              options={typeWorks ? typeWorks : ([{}] as TypeWork[])}
              onChange={(e, value) => setSelectedTypeWork(value)}
            />
          )}

          <Accordion sx={{ width: "100%", mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Endereço</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InfoTextField
                fullWidth
                icon={<LocationCity />}
                label="Cidade"
                defaultValue={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />
              <InfoTextField
                fullWidth
                icon={<Public />}
                label="CEP"
                defaultValue={address.cep}
                onChange={(e) =>
                  setAddress({ ...address, cep: e.target.value })
                }
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
                defaultValue={address.neighborhood}
                icon={<HolidayVillage />}
                label="Bairro"
                onChange={(e) =>
                  setAddress({ ...address, neighborhood: e.target.value })
                }
              />
              <InfoTextField
                fullWidth
                defaultValue={address.street}
                icon={<NearMe />}
                label="Rua"
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
              />
              <InfoTextField
                fullWidth
                defaultValue={address.number}
                icon={<Numbers />}
                label="Logradouro"
                onChange={(e) =>
                  setAddress({ ...address, number: e.target.value })
                }
              />
              <InfoTextField
                fullWidth
                defaultValue={
                  address.latitude ? address.latitude.toString() : ""
                }
                icon={<Numbers />}
                label="Latitude"
                onChange={(e) =>
                  setAddress({ ...address, latitude: Number(e.target.value) })
                }
              />
              <InfoTextField
                fullWidth
                defaultValue={
                  address.longitude ? address.longitude.toString() : ""
                }
                icon={<Numbers />}
                label="Longitude"
                onChange={(e) =>
                  setAddress({ ...address, longitude: Number(e.target.value) })
                }
              />
            </AccordionDetails>
          </Accordion>
        </>
      )}
      {inputMode === "CSV" && (
        <CSVReader
          onFileLoaded={(data, fileInfo, originalFile) =>
            console.log(data, fileInfo, originalFile)
          }
        />
      )}
      {inputMode === "XLSX" && (
        <input onChange={(e) => handleReadXLSX(e)} accept=".xlsx" type="file" />
      )}

      <Grid sx={{ mt: 2 }} item display="flex" justifyContent="flex-end">
        <Button
          disabled={isLoading || successWaning}
          variant="contained"
          color="success"
          onClick={handleSubmitPublicWork}
        >
          {isLoading ? <CircularProgress /> : "Salvar"}
        </Button>
      </Grid>
      {successWaning && (
        <WarningField
          title="Obra adicionada com sucesso!"
          message={`A Obra ${name}, do tipo ${selectedTypeWork?.name} foi adicionada com sucesso!`}
          severity="success"
        />
      )}
      {errorWarning && (
        <WarningField
          title="Falha ao realizar o cadastro!"
          message={`Verifique a integridade dos campos!`}
          severity="error"
        />
      )}
    </SingleDialogContainer>
  );
}
