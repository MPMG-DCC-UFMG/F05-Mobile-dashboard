import { AddToQueue } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

interface QueueItemProps {
  onClick(): void;
  title: string;
  value: string;
}

export function QueueItem({ onClick, title, value }: QueueItemProps) {
  return (
    <CardActionArea sx={{ mt: 4 }}>
      <Card
        sx={{
          height: "100%",
        }}
      >
        <CardContent onClick={onClick}>
          <Grid
            container
            spacing={3}
            sx={{
              justifyContent: "space-between",
            }}
          >
            <Grid item>
              <Typography color="gray" gutterBottom variant="overline">
                {title}
              </Typography>
              <Typography color="black" variant="h6">
                {value}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  height: 56,
                  width: 56,
                }}
              >
                <AddToQueue />
              </Avatar>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
