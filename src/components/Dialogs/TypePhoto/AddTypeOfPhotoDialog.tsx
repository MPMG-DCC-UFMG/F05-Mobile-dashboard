import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { CreateTypePhotoDTO } from "../../../core/models/dto/typePhotos/CreateTypePhotoDTO";
import { useAddTypePhoto } from "../../../core/network/queries/typePhotos/mutations";
import {
	SingleDialogContainer,
	SingleDialogContainerProps,
} from "../DialogContainer";

export function AddTypeOfPhotoDialog({
	state,
	setState,
	title,
}: SingleDialogContainerProps) {
	const [createTypePhoto, setCreateTypePhoto] = useState(
		{} as CreateTypePhotoDTO
	);
	const { mutate, isLoading } = useAddTypePhoto();

	const handleAddTypeOfPhoto = () => {
		mutate(createTypePhoto);
		setState(false);
	};

	const handleCloseDialog = () => {
		setState(false);
	};

	return (
		<SingleDialogContainer state={state} setState={setState} title={title}>
			<TextField
				onChange={(e) =>
					setCreateTypePhoto({ ...createTypePhoto, name: e.target.value })
				}
				required
				label="Tipo da Foto"
				fullWidth
			/>
			<TextField
				sx={{ mt: 2 }}
				onChange={(e) =>
					setCreateTypePhoto({
						...createTypePhoto,
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
						onClick={handleAddTypeOfPhoto}
						color="success"
						variant="contained"
					>
						{isLoading ? <CircularProgress /> : "Confirmar"}
					</Button>
				</Grid>
			</Grid>
		</SingleDialogContainer>
	);
}
