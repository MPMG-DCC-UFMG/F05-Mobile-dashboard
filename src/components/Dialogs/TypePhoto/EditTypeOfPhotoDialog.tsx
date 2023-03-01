import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { TypePhoto } from "../../../core/models/TypePhoto";
import { useUpdateTypePhoto } from "../../../core/network/queries/typePhotos/mutations";
import { closeDialog } from "../../../utils/dialogHandler";
import { TableDialogContainer } from "../DialogContainer";

interface EditTypeOfPhotoDialog {
	state: boolean[];
	setState(state: boolean[]): void;
	typePhoto: TypePhoto;
	index: number;
	title: string;
}

export function EditTypeOfPhotoDialog({
	state,
	setState,
	typePhoto,
	index,
	title,
}: EditTypeOfPhotoDialog) {
	const [updateTypePhoto, setUpdateTypePhoto] = useState<TypePhoto>(typePhoto);
	const { mutate: updatePhoto } = useUpdateTypePhoto();

	const handleEditTypePhoto = () =>{
		updatePhoto(updateTypePhoto);
		setState(state.map((value) => value === true ? false : value));
	}

	return (
		<TableDialogContainer
			state={state}
			setState={setState}
			index={index}
			title={title}
		>
			<Grid container justifyContent="space-between" alignItems="center">
				<TextField
					onChange={(e) =>
						setUpdateTypePhoto({ ...updateTypePhoto, name: e.target.value })
					}
					required
					label="Tipo Da Foto"
					defaultValue={typePhoto.name}
					fullWidth
				/>
				<TextField
					onChange={(e) =>
						setUpdateTypePhoto({
							...updateTypePhoto,
							description: e.target.value,
						})
					}
					required
					label="Descrição Da Foto"
					defaultValue={typePhoto.description}
					fullWidth
					sx={{ mt: 2 }}
				/>
				<Grid
					container
					spacing={2}
					sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
				>
					<Grid item display="flex">
						<Button
							onClick={() => closeDialog(state, setState, index)}
							color="error"
							variant="contained"
						>
							Cancelar
						</Button>
					</Grid>
					<Grid item display="flex">
						<Button
							onClick={() => handleEditTypePhoto()}
							color="success"
							variant="contained"
						>
							Salvar
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</TableDialogContainer>
	);
}
