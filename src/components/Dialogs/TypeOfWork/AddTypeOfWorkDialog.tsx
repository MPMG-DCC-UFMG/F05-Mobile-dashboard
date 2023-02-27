import {
	Button,
	Checkbox,
	Grid,
	Table,
	TableCell,
	TableContainer,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { CreateTypeWorkDTO } from "../../../core/models/dto/typeWork/CreateTypeWorkDTO";
import { useAddTypeWork } from "../../../core/network/queries/typeWork/mutations";
import { useTypePhotoStore } from "../../../core/store/typePhoto";
import {
	SingleDialogContainer,
	SingleDialogContainerProps,
} from "../DialogContainer";

export function AddTypeOfWorkDialog({
	state,
	setState,
	title,
}: SingleDialogContainerProps) {
	const typePhotos = useTypePhotoStore((state) => state.typePhotos);
	const { mutate } = useAddTypeWork();
	const [createTypeWork, setCreateTypeWork] = useState<CreateTypeWorkDTO>({
		name: "",
		status_list: [],
	});

	const handleAddTypeOfWork = () => {
		mutate(createTypeWork);
		setState(false);
	};

	const handleCloseDialog = () => {
		setState(false);
	};

	return (
		<SingleDialogContainer state={state} setState={setState} title={title}>
			<TextField
				onChange={(e) =>
					setCreateTypeWork({ ...createTypeWork, name: e.target.value })
				}
				required
				label="Tipo da Obra"
				fullWidth
			/>
			<Typography sx={{ mt: 3 }} variant="subtitle1">
				Tipos de Foto:
			</Typography>
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
					<Button onClick={handleCloseDialog} color="error" variant="contained">
						Cancelar
					</Button>
				</Grid>
				<Grid item display="flex">
					<Button
						onClick={handleAddTypeOfWork}
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
