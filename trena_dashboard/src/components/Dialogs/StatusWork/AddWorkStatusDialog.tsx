import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { CreateWorkStatusDTO } from "../../../core/models/dto/workStatus/CreateWorkStatusDTO";
import { useAddWorkStatus } from "../../../core/network/queries/workStatus/mutations";
import {
	SingleDialogContainer,
	SingleDialogContainerProps,
} from "../DialogContainer";

export function AddWorkStatusDialog({
	state,
	setState,
	title,
}: SingleDialogContainerProps) {
	const { mutate } = useAddWorkStatus();
	const [createWorkStatus, setCreateWorkStatus] = useState(
		{} as CreateWorkStatusDTO
	);

	const handleAddWorkStatus = () => {
		mutate(createWorkStatus);
		setState(false);
	};

	const handleCloseDialog = () => {
		setState(false);
	};

	return (
		<SingleDialogContainer state={state} setState={setState} title={title}>
			<TextField
				onChange={(e) =>
					setCreateWorkStatus({ ...createWorkStatus, name: e.target.value })
				}
				required
				label="Nome do estado da obra"
				fullWidth
			/>
			<TextField
				sx={{ mt: 2 }}
				onChange={(e) =>
					setCreateWorkStatus({
						...createWorkStatus,
						description: e.target.value,
					})
				}
				required
				label="Descrição"
				fullWidth
			/>
			<Grid
				container
				spacing={2}
				sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
			>
				<Grid item display="flex">
					<Button onClick={handleCloseDialog} color="error" variant="contained">
						Cancelar
					</Button>
				</Grid>
				<Grid item display="flex">
					<Button
						onClick={handleAddWorkStatus}
						color="success"
						variant="contained"
					>
						Confirmar
					</Button>
				</Grid>
			</Grid>
		</SingleDialogContainer>
	);
}
