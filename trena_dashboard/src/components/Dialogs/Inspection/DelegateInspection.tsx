import {
  AlternateEmail,
  Numbers,
  Rtt,
  TextFields,
  TextIncrease,
} from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { CreateInspectionDTO } from "../../../core/models/dto/CreateInspectionDTO";
import { PublicWork } from "../../../core/models/PublicWork";
import { InspectionServiceQuery } from "../../../core/network/services/InspectionService";
import { InfoTextField } from "../../Inputs/InfoTextField";
import { WarningField } from "../../WarningField";
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
  const [inspection, setInspection] = useState<CreateInspectionDTO>({
    inquiry_number: null,
    name: "",
    user_email: "",
    public_work_id: publicWork.id,
    description: "",
    status: 0,
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { mutate, isLoading } = useMutation(
    InspectionServiceQuery.addInspection
  );

  const handleAddInspection = () => {
    mutate(inspection, {
      onError: () => {
        setError(true);
        setSuccess(false);
      },
      onSuccess: () => {
        setSuccess(true);
        setError(false);
      },
    });
  };

  return (
    <TableDialogContainer
      state={state}
      setState={setState}
      title="Delegar Inspeção"
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
      <InfoTextField
        label="Email do Vistoriador responsável"
        defaultValue={inspection.user_email}
        onChange={(e) =>
          setInspection({ ...inspection, user_email: e.target.value })
        }
        icon={<AlternateEmail />}
        type="email"
      />
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
        disabled={isLoading || success}
        variant="contained"
        color="success"
        onClick={handleAddInspection}
      >
        {isLoading ? <CircularProgress /> : "Salvar"}
      </Button>
      {success && (
        <WarningField
          title="Vistoria cadastrada com sucesso!"
          severity="success"
          message={`A vistoria ${inspection.name}, de inquérito ${inspection.inquiry_number} foi delegada ao usuário ${inspection.user_email}`}
        />
      )}
      {error && (
        <WarningField
          title="Erro ao cadastrar vistoria"
          severity="error"
          message="Erro ao cadastrar vistoria. Verifique a integridade dos campos preenchidos"
        />
      )}
    </TableDialogContainer>
  );
}
