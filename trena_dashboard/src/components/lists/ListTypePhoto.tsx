import { Delete, Edit, ManageSearch } from "@mui/icons-material";
import {
	Divider,
	Grid,
	IconButton,
	InputAdornment,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
import React, { useState } from "react";
import { TypePhoto } from "../../core/models/TypePhoto";
import { useDeleteTypePhoto } from "../../core/network/queries/typePhotos/mutations";
import { useLoadTypePhotos } from "../../core/network/queries/typePhotos/queries";
import { useTableStore } from "../../core/store/table";
import { useTypePhotoStore } from "../../core/store/typePhoto";
import { openDialog } from "../../utils/dialogHandler";
import { AddTypeOfPhotoDialog } from "../Dialogs/TypePhoto/AddTypeOfPhotoDialog";
import { EditTypeOfPhotoDialog } from "../Dialogs/TypePhoto/EditTypeOfPhotoDialog";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";

export function ListTypePhoto() {
	const { data: originalData, isLoading } = useLoadTypePhotos();
	const { typePhotos, setTypePhotos, editDialog, setEditDialog } =
		useTypePhotoStore();

	const { rowsPerPage, setRowsPerPage } = useTableStore();

	const { mutate } = useDeleteTypePhoto();

	const [addTypePhotoDialog, setOpenAddTypePhotoDialog] = useState(false);
	const [page, setPage] = useState(0);

	const handleSearch = (value?: string) => {
		if (value) {
			const filteredTypePhoto = typePhotos.filter((item) =>
				item.name.toUpperCase().includes(value.toUpperCase())
			);
			setTypePhotos(filteredTypePhoto);
		} else {
			setTypePhotos(originalData ? originalData : []);
		}
	};

	const handleDeleteTypePhoto = (flag: number) => {
		mutate(flag);
	};

	return (
		<>
			{isLoading || !typePhotos ? (
				<LoadingTableData
					headingAction={() => setOpenAddTypePhotoDialog(true)}
					headingTitle="Tipo de Foto"
					headingButtonTitle="Adicionar Tipo de Foto"
					headingSteps={[
						{ title: "Dashboard", url: "/" },
						{ title: "Estado das Obras", url: "/" },
					]}
				/>
			) : (
				<Grid style={{ width: "100%", marginTop: 14 }} item xs={12}>
					<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
						<Heading
							buttonTitle="Adicionar Tipo de Foto"
							title="Tipos de Fotos"
							steps={[
								{ title: "Dashboard", url: "/" },
								{ title: "Tipos de Fotos", url: "/" },
							]}
							handleAction={() => setOpenAddTypePhotoDialog(true)}
						>
							<AddTypeOfPhotoDialog
								state={addTypePhotoDialog}
								setState={setOpenAddTypePhotoDialog}
								title="Adicionar tipo de foto"
							/>
							<Grid item display="flex" padding={2} justifyContent="flex-Start">
								<TextField
									fullWidth
									size="small"
									onChange={(e) => handleSearch(e.target.value)}
									label="Tipo de Foto"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<ManageSearch />
											</InputAdornment>
										),
									}}
								/>
							</Grid>
							<Divider />
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Nome</TableCell>
										<TableCell>Descrição</TableCell>
										<TableCell>Editar</TableCell>
										<TableCell>Remover</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{typePhotos
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((typePhoto: TypePhoto, index: number) => (
											<React.Fragment key={typePhoto.flag}>
												<TableRow hover>
													<TableCell>{typePhoto.name}</TableCell>
													<TableCell>{typePhoto.description}</TableCell>
													<TableCell>
														<IconButton
															onClick={() =>
																openDialog(editDialog, setEditDialog, index)
															}
															color="warning"
															size="small"
														>
															<Edit />
														</IconButton>
													</TableCell>
													<TableCell>
														<IconButton
															color="error"
															size="small"
															onClick={() =>
																handleDeleteTypePhoto(typePhoto.flag)
															}
														>
															<Delete />
														</IconButton>
													</TableCell>
													<EditTypeOfPhotoDialog
														state={editDialog}
														setState={setEditDialog}
														typePhoto={typePhoto}
														index={index}
														title="Editar Tipo De Foto"
													/>
												</TableRow>
											</React.Fragment>
										))}
								</TableBody>
							</Table>
							<TablePagination
								rowsPerPage={rowsPerPage}
								setRowsPerPage={setRowsPerPage}
								page={page}
								setPage={setPage}
								data={typePhotos}
							/>
						</Heading>
					</Paper>
				</Grid>
			)}
		</>
	);
}
