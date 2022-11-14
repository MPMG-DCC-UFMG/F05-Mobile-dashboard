import React, { useState } from "react";
import { DashboardContentContainer } from "../components/containers/ContentContainer";
import { DashboardContainer } from "../components/containers/DashboardContainer";
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
              value="3 Coletas"
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

