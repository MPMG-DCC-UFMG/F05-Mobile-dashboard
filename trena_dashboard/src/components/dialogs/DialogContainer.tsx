import { Dialog, DialogTitle, useTheme } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { DialogContent, Divider, Grid, IconButton } from "@mui/material";
import React from "react";

interface BasicDialogProps {
  children: React.ReactNode[];
  title: string;
}

interface SingleDialogContainerProps extends BasicDialogProps {
  state: boolean;
  setState(state: boolean): void;
}

export function SingleDialogContainer({
  state,
  setState,
  children,
  title,
}: SingleDialogContainerProps) {
  const theme = useTheme();

  return (
    <Dialog
      TransitionProps={{ unmountOnExit: true }}
      open={state}
      scroll="body"
      fullWidth
    >
      <DialogTitle color={theme.palette.grey[400]}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>{title}</Grid>
          <Grid item>
            <IconButton sx={{ size: "small" }} onClick={() => setState(false)}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid container flexDirection="column" item sx={{ pt: 2 }}>
            {children}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

interface TableDialogProps extends BasicDialogProps {
  state: boolean[];
  setState(state: boolean[]): void;
  index: number;
}

export function TableDialogContainer({
  state,
  setState,
  index,
  children,
  title,
}: TableDialogProps) {
  const theme = useTheme();

  const handleCloseDialog = (index: number) =>
    setState(state.map((s, pos) => (pos === index ? false : s)));

  return (
    <Dialog
      TransitionProps={{ unmountOnExit: true }}
      open={state[index]}
      scroll="body"
      fullWidth
    >
      <DialogTitle color={theme.palette.grey[400]}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>{title}</Grid>
          <Grid item>
            <IconButton
              sx={{ size: "small" }}
              onClick={() => handleCloseDialog(index)}
            >
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid container flexDirection="column" item sx={{ pt: 2 }}>
            {children}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
