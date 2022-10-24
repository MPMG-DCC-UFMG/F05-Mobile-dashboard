import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Add, Edit, Delete } from "@mui/icons-material";
import { Grid, ButtonGroup, Button, IconButton, Stack } from "@mui/material";

interface ItemActionsMenuProps {
  itemSelected: boolean,
  onAddClicked: () => void,
  onEditClicked: () => void,
  onDeleteClicked: () => void,
}

export const ItemActionsMenu: React.FC<ItemActionsMenuProps> = (props) => {
  const { itemSelected } = props

  return (
    <Stack spacing={2} direction="row">
        <Button
          size="small"
          onClick={props.onAddClicked}
          color="success"
          variant="contained"
        >
          <Add/>
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

    // <div className="container">
    //     <div className="buttons has-addons is-centered">
    //         <button className="button is-success" onClick={props.onAddClicked}>
    //             <span className="icon is-small">
    //                 <FontAwesomeIcon icon={faPlus}/>
    //             </span>
    //         </button>
    //         <button className="button is-info" onClick={props.onEditClicked} disabled={!itemSelected}>
    //             <span className="icon is-small">
    //                 <FontAwesomeIcon icon={faEdit}/>
    //             </span>
    //         </button>
    //         <button className="button is-danger" onClick={props.onDeleteClicked} disabled={!itemSelected}>
    //             <span className="icon is-small">
    //                 <FontAwesomeIcon icon={faTrash}/>
    //             </span>
    //         </button>
    //     </div>
    // </div>
  );
};
