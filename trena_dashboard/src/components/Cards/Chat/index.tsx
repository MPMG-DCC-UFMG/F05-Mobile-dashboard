import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import {
  LoggedUserResponse,
  SecurityServiceQuery,
} from "../../../core/network/services/SecurityService";
import { convertEphocDate } from "../../../utils/mapper";

interface ChatCardProps {
  messageOwner: string;
  text: string;
  timestamp: number;
  side: "left" | "right";
}

export function ChatCard({
  messageOwner,
  text,
  timestamp,
  side,
}: ChatCardProps) {
  const { data: ownerMetadata } = useQuery<LoggedUserResponse>(
    ["getUserChatMetadata", messageOwner],
    () => SecurityServiceQuery.getLoggedUser()
  );

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent={side === "right" ? "flex-end" : "flex-start"}
      >
        {side === "left" && (
          <Grid item>
            <Avatar src={ownerMetadata?.picture} />
          </Grid>
        )}
        <Grid item>
          <Typography align="left" color={side === "right" ? "blue" : "gray"}>
            {text}
          </Typography>
          {convertEphocDate(timestamp)}
        </Grid>
      </Grid>
    </>
  );
}
