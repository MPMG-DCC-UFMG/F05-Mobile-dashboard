import {
  Avatar,
  Card as MuiCard,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

interface CardProps {
  title: string;
  value: string;
  icon: JSX.Element;
  iconColor: string;
  onClick(): void;
}

export function Card({ title, value, icon, iconColor, onClick }: CardProps) {
  return (
    <CardActionArea>
      <MuiCard sx={{ height: "100%", width: "100%" }}>
        <CardContent onClick={onClick}>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography gutterBottom>{title}</Typography>
              <Typography>{value}</Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: iconColor,
                  height: 56,
                  width: 56,
                }}
              >
                {icon}
              </Avatar>
            </Grid>
          </Grid>
        </CardContent>
      </MuiCard>
    </CardActionArea>
  );
}
