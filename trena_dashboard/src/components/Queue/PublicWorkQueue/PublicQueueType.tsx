import { EngineeringOutlined, Handyman } from "@mui/icons-material";
import React from "react";
import { useQuery } from "react-query";
import { PublicWork } from "../../../core/models/PublicWork";
import { TypeWork } from "../../../core/models/TypeWork";
import { TypeWorkServiceQuery } from "../../../core/network/services/TypeWorkService";
import { InfoTextField } from "../../Inputs/InfoTextField";

interface PublicQueueTypeProps {
  publicWork: PublicWork;
}

export function PublicQueueType({ publicWork }: PublicQueueTypeProps) {
  const { data: typeWorks } = useQuery<TypeWork[]>(["getTypeWorks"], () =>
    TypeWorkServiceQuery.loadTypeWorks()
  );

  const typeWork =
    typeWorks &&
    typeWorks.find((type) => type.flag === publicWork.type_work_flag);

  return (
    <>
      {typeWork && (
        <>
          <InfoTextField
            label="Nome"
            defaultValue={publicWork.name}
            fullWidth
            disabled
            icon={<Handyman />}
          />
          <InfoTextField
            label="Tipo de Obra"
            defaultValue={typeWork.name!}
            fullWidth
            disabled
            icon={<EngineeringOutlined />}
          />
        </>
      )}
    </>
  );
}
