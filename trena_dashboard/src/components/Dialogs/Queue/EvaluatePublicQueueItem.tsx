import React from "react";
import { PublicWork } from "../../../core/models/PublicWork";
import { PublicQueueStepper } from "../../Queue/PublicWorkQueue/PublicQueueStepper";
import { TableDialogContainer, TableDialogProps } from "../DialogContainer";

interface EvaluatePublicQueueItemDialogProps extends TableDialogProps {
  publicWork: PublicWork;
}

export function EvaluatePublicQueueDialog({
  publicWork,
  index,
  state,
  setState,
  title,
  fullScreen,
}: EvaluatePublicQueueItemDialogProps) {
  return (
    <TableDialogContainer
      state={state}
      setState={setState}
      index={index}
      title={title}
      fullScreen={fullScreen}
    >
      {publicWork && (
        <PublicQueueStepper
          state={state}
          setState={setState}
          index={index}
          publicWork={publicWork}
        />
      )}
    </TableDialogContainer>
  );
}
