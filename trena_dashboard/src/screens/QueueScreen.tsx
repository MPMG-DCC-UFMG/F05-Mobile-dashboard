import React, { useState } from "react";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { ListQueue } from "../components/lists/ListQueue";

export function QueueScreen() {
  const [open, setOpen] = useState(false);

  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <ListQueue />
      </DashboardContentContainer>
    </DashboardContainer>
  );
}

