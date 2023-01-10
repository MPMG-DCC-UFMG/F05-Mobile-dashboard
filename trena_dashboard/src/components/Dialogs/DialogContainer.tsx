import { Close } from "@material-ui/icons";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import React from "react";

interface BasicDialogProps {
  children?: React.ReactNode[] | React.ReactNode;
  title: string;
  fullScreen?: boolean;
}

export interface SingleDialogContainerProps extends BasicDialogProps {
  state: boolean;
  setState(state: boolean): void;
}

export function SingleDialogContainer({
  state,
  setState,
  children,
  title,
  fullScreen,
}: SingleDialogContainerProps) {
  return (
    <Dialog
      TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}
      open={state}
      scroll="body"
      fullWidth
      fullScreen={fullScreen}
      onClose={() => setState(false)}
    >
      <DialogTitle>
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

export interface TableDialogProps extends BasicDialogProps {
  state: boolean[];
  setState(state: boolean[]): void;
  index: number;
  scroll?: "body" | "paper";
}

export function TableDialogContainer({
  state,
  setState,
  index,
  children,
  title,
  fullScreen,
  scroll = "body",
}: TableDialogProps) {
  const handleCloseDialog = (index: number) =>
    setState(state.map((s, pos) => (pos === index ? false : s)));

  return (
    <Dialog
      TransitionProps={{ unmountOnExit: true, mountOnEnter: false }}
      open={state[index]}
      scroll={scroll}
      fullWidth
      fullScreen={fullScreen}
      onClose={handleCloseDialog}
    >
      <DialogTitle>
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
