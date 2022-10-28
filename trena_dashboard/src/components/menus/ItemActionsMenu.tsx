import { Add, Delete, Edit } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import React from "react";

interface ItemActionsMenuProps {
  itemSelected: boolean;
  onAddClicked: () => void;
  onEditClicked: () => void;
  onDeleteClicked: () => void;
}

export const ItemActionsMenu: React.FC<ItemActionsMenuProps> = (props) => {
  const { itemSelected } = props;

  return (
    <Stack spacing={2} direction="row">
      <Button
        size="small"
        onClick={props.onAddClicked}
        color="success"
        variant="contained"
      >
        <Add />
      </Button>
      <Button
        size="small"
        onClick={props.onEditClicked}
        disabled={!itemSelected}
        color="info"
        variant="contained"
      >
        <Edit />
      </Button>
      <Button
        size="small"
        onClick={props.onDeleteClicked}
        disabled={!itemSelected}
        color="error"
        variant="contained"
      >
        <Delete />
      </Button>
    </Stack>
  );
};
