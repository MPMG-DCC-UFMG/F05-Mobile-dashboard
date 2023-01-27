import {
	Button,
	Checkbox,
	CircularProgress,
	Grid,
	Table,
	TableCell,
	TableContainer,
	TableRow,
	TextField,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { UpdateTypeWorkDTO } from "../../../core/models/dto/typeWork/UpdateTypeWorkDTO";
import { TypeWork } from "../../../core/models/TypeWork";
import { useLoadTypePhotos } from "../../../core/network/queries/typePhotos/queries";
import { useUpdateTypeWork } from "../../../core/network/queries/typeWork/mutations";
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
	const { mutate, isLoading } = useUpdateTypeWork();
  const [typeWorkName, setTypeWorkName] = useState<string>(typeWork.name)
	const [updateTypeWork, setUpdateTypeWork] = useState<UpdateTypeWorkDTO>({
		name: "",
		status_list: [],
	});

	const handleCloseDialog = useCallback(() => {
		closeDialog(state, setState, index);
	}, []);

  const handleEditTypeOfWork = (typeWork: TypeWork) => {
    typeWork.name = typeWorkName;
    // editTypeWork(typeWork);
    // handleCloseDialog(index);
  };
	const handleTypeOfWorkStatus = useCallback(() => {
		mutate(updateTypeWork);
		handleCloseDialog();
	}, []);

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
						setUpdateTypeWork({ ...updateTypeWork, name: e.target.value })
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
							{isLoading ? <CircularProgress /> : "Salvar"}
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</TableDialogContainer>
	);
}

