import { Numbers, Rtt, TextFields, TextIncrease } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CreateInspectionDTO } from "../../../core/models/dto/CreateInspectionDTO";
import { PublicWork } from "../../../core/models/PublicWork";
import { User } from "../../../core/models/User";
import { InspectionServiceQuery } from "../../../core/network/services/InspectionService";
import { SecurityServiceQuery } from "../../../core/network/services/SecurityService";
import { InfoTextField } from "../../Inputs/InfoTextField";
import { Notify } from "../../Toast/Notify";
import { TableDialogContainer } from "../DialogContainer";

interface DelegateInspectionProps {
  state: boolean[];
  setState(state: boolean[]): void;
  index: number;
  publicWork: PublicWork;
}

export function DelegateInspectionDialog({
  state,
  setState,
  index,
  publicWork,
}: DelegateInspectionProps) {
  const queryClient = useQueryClient();

  const { data: users } = useQuery<User[]>(["getUsers"], () =>
    SecurityServiceQuery.loadUsersList()
  );

  const [inspection, setInspection] = useState<CreateInspectionDTO>({
    inquiry_number: null,
    name: "",
    user_email: "",
    public_work_id: publicWork.id,
    description: "",
    status: 0,
    request_date: Date.now(),
  });
  const handleCloseDialog = () => {
    setState(state.map((s, pos) => (pos === index ? false : s)));
  };

  const { mutate, isLoading } = useMutation(
    InspectionServiceQuery.addInspection
  );

  const handleAddInspection = () => {
    mutate(
      { ...inspection, request_date: Date.now() },
      {
        onError: () => {
          Notify(
            "Erro ao cadastrar vistoria. Verifique a integridade dos campos preenchidos",
            "bottom-center",
            "error"
          );
        },
        onSuccess: () => {
          setInspection({
            inquiry_number: null,
            name: "",
            user_email: "",
            public_work_id: publicWork.id,
            description: "",
            status: 0,
            request_date: Date.now(),
          });
          Notify(`Vistoria delegada com sucesso!`, "bottom-left", "success");
          queryClient.invalidateQueries("getMpInspections");
          queryClient.invalidateQueries([
            "getPublicWorkInspections",
            publicWork.id,
          ]);
          handleCloseDialog();
        },
      }
    );
  };

  return (
    <TableDialogContainer
      state={state}
      setState={setState}
      title="Delegar Vistoria"
      index={index}
    >
      <InfoTextField
        label="Obra Pública"
        defaultValue={publicWork.name}
        disabled
        icon={<TextFields />}
      />
      <InfoTextField
        label="Número de Inquérito"
        defaultValue={inspection.inquiry_number?.toString()}
        onChange={(e) =>
          setInspection({
            ...inspection,
            inquiry_number: Number(e.target.value),
          })
        }
        icon={<Numbers />}
        type="number"
      />
      <InfoTextField
        label="Nome da Vistoria"
        defaultValue={inspection.name}
        onChange={(e) => setInspection({ ...inspection, name: e.target.value })}
        icon={<TextIncrease />}
      />
      {users && (
        <Autocomplete
          sx={{ mt: 2 }}
          disablePortal
          fullWidth
          renderInput={(params) => (
            <TextField {...params} label="Email do Vistoriador responsável" />
          )}
          getOptionLabel={(option) => option.email}
          options={users ? users : ([{}] as User[])}
          onChange={(e, value) => {
            value === null
              ? setInspection({ ...inspection, user_email: "" })
              : setInspection({ ...inspection, user_email: value.email });
          }}
        />
      )}
      <InfoTextField
        label="Descrição"
        defaultValue={inspection.description}
        onChange={(e) =>
          setInspection({ ...inspection, description: e.target.value })
        }
        icon={<Rtt />}
        multiline
      />

      <Button
        disabled={isLoading}
        variant="contained"
        color="success"
        onClick={handleAddInspection}
      >
        {isLoading ? <CircularProgress /> : "Salvar"}
      </Button>
    </TableDialogContainer>
  );
}
