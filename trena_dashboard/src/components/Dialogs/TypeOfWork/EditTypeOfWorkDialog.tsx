import {
	Button,
	Checkbox,
	Grid,
	Table,
	TableCell,
	TableContainer,
	TableRow,
	TextField,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { UpdateTypePhotoDTO } from "../../../core/models/dto/typePhotos/UpdateTypePhotoDTO";
import { TypeWork } from "../../../core/models/TypeWork";
import { useLoadTypePhotos } from "../../../core/network/queries/typePhotos/queries";
import { useTypePhotoStore } from "../../../core/store/typePhoto";
import { closeDialog } from "../../../utils/dialogHandler";
import { TableDialogContainer } from "../DialogContainer";

interface EditTypeOfWorkDialog {
	state: boolean[];
	setState(state: boolean[]): void;
	typeWork: TypeWork;
	index: number;
	title: string;
}

export function EditTypeOfWorkDialog({
	state,
	setState,
	typeWork,
	index,
	title,
}: EditTypeOfWorkDialog) {
	useLoadTypePhotos();
	const typePhotos = useTypePhotoStore((state) => state.typePhotos);
	const [updateTypePhoto, setUpdateTypePhoto] = useState(
		{} as UpdateTypePhotoDTO
	);

	const handleCloseDialog = useCallback(() => {
		closeDialog(state, setState, index);
	}, []);

	const handleTypeOfWorkStatus = () => {
		handleCloseDialog();
	};

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
					label="Tipo da Obra"
					defaultValue={typeWork.name}
					fullWidth
				/>
				<TableContainer>
					<Table>
						{typePhotos.map((typePhoto) => (
							<TableRow key={typePhoto.flag}>
								<TableCell>
									<Checkbox />
								</TableCell>
								<TableCell>{typePhoto.name}</TableCell>
							</TableRow>
						))}
					</Table>
				</TableContainer>
				<Grid
					container
					spacing={2}
					sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
				>
					<Grid item display="flex">
						<Button
							onClick={() => handleCloseDialog()}
							color="error"
							variant="contained"
						>
							Cancelar
						</Button>
					</Grid>
					<Grid item display="flex">
						<Button
							onClick={() => handleTypeOfWorkStatus()}
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
