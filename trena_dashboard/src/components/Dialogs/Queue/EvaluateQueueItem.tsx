import React from "react";
import { useQuery } from "react-query";
import { Collect } from "../../../core/models/Collect";
import { PublicWork } from "../../../core/models/PublicWork";
import { PublicWorkServiceQuery } from "../../../core/network/services/PublicWorkService";
import { QueueStepper } from "../../Queue/QueueStepper";
import { TableDialogContainer, TableDialogProps } from "../DialogContainer";

interface EvaluateQueueItemDialogProps extends TableDialogProps {
  collect: Collect;
}

export function EvaluateQueueItemDialog({
  collect,
  index,
  state,
  setState,
  title,
  fullScreen,
}: EvaluateQueueItemDialogProps) {
  const { data: publicWork } = useQuery<PublicWork>(
    ["getCollectPublicWork", collect.id!],
    () => PublicWorkServiceQuery.getPublicWorkById(collect.public_work_id)
  );

  return (
    <TableDialogContainer
      state={state}
      setState={setState}
      index={index}
      title={title}
      fullScreen={fullScreen}
    >
      {publicWork && <QueueStepper collect={collect} publicWork={publicWork} />}
    </TableDialogContainer>
  );
}
