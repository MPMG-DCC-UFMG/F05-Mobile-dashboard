import React from "react";
import { PublicWork } from "../../../core/models/PublicWork";
import { QueueStepper } from "../../Queue/QueueStepper";
import { TableDialogContainer, TableDialogProps } from "../DialogContainer";

interface EvaluateQueueItemDialogProps extends TableDialogProps {
  publicWork: PublicWork;
}

export function EvaluateQueueItemDialog({
  publicWork,
  index,
  state,
  setState,
  title,
  fullScreen,
}: EvaluateQueueItemDialogProps) {
  return (
    <TableDialogContainer
      state={state}
      setState={setState}
      index={index}
      title={title}
      fullScreen={fullScreen}
    >
      {publicWork && <QueueStepper publicWork={publicWork} />}
    </TableDialogContainer>
  );
}
