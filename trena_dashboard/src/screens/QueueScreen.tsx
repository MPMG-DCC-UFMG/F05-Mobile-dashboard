import React, { useState } from "react";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { QueueItem } from "../components/Queue/QueueItem";
import { QueueStepper } from "../components/Queue/QueueStepper";

export function QueueScreen() {
  const [open, setOpen] = useState(false);

  return (
    <DashboardContainer>
      <DashboardContentContainer>
        {open ? (
          <>
            <QueueItem
              title="Não há novos dados da obra"
              value="1 Coleta"
              onClick={() => setOpen(!open)}
            />
            <QueueItem
              title="Não há novos dados da obra"
              value="2 Coletas"
              onClick={() => setOpen(!open)}
            />
          </>
        ) : (
          <QueueStepper close={open} setClose={setOpen} />
        )}
      </DashboardContentContainer>
    </DashboardContainer>
  );
}
