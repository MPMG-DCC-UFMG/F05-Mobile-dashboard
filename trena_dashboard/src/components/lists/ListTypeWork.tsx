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
import { TypeWork } from "../../core/models/TypeWork";
import { useLoadTypeWorks } from "../../core/network/queries/typeWork/queries";
import { useTableStore } from "../../core/store/table";
import { useTypeWorkStore } from "../../core/store/typeWorks";
import { openDialog } from "../../utils/dialogHandler";
import { AddTypeOfWorkDialog } from "../Dialogs/TypeOfWork/AddTypeOfWorkDialog";
import { EditTypeOfWorkDialog } from "../Dialogs/TypeOfWork/EditTypeOfWorkDialog";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";

export function ListTypeWork() {
	const { data: originalTypeWorks, isLoading } = useLoadTypeWorks();

	const {
		typeWorks,
		editDialog,
		deleteDialog,
		setTypeWorks,
		setEditDialog,
		setDeleteDialog,
	} = useTypeWorkStore();

	const { rowsPerPage, setRowsPerPage } = useTableStore();

	const [addTypeWorkDialog, setOpenAddTypeWorkDialog] = useState(false);
	const [page, setPage] = useState(0);

	const handleSearch = (value?: string) => {
		if (value) {
			const filteredTypeWorks = typeWorks.filter((item) =>
				item.name.toUpperCase().includes(value.toUpperCase())
			);
			setTypeWorks(filteredTypeWorks);
		} else {
			setTypeWorks(originalTypeWorks ? originalTypeWorks : []);
		}
	};

	return (
		<>
			{isLoading || !typeWorks ? (
				<LoadingTableData
					headingAction={() => setOpenAddTypeWorkDialog(true)}
					headingTitle="Tipos de Obras"
					headingButtonTitle="Adicionar Tipo de Obra"
					headingSteps={[
						{ title: "Dashboard", url: "/" },
						{ title: "Tipos de Obras", url: "/" },
					]}
				/>
			) : (
				<Grid style={{ width: "100%", marginTop: 14 }} item xs={12}>
					<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
						<Heading
							buttonTitle="Adicionar Tipo de Obra"
							title="Tipos de Obras"
							steps={[
								{ title: "Dashboard", url: "/" },
								{ title: "Tipos de Obras", url: "/" },
							]}
							handleAction={() => setOpenAddTypeWorkDialog(true)}
						>
							<AddTypeOfWorkDialog
								state={addTypeWorkDialog}
								setState={setOpenAddTypeWorkDialog}
								title="Adicionar Tipo De Obra"
							/>
							<Grid item display="flex" padding={2} justifyContent="flex-Start">
								<TextField
									fullWidth
									size="small"
									onChange={(e) => handleSearch(e.target.value)}
									label="Tipo de Obra"
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
										<TableCell align="center">Nome</TableCell>
										<TableCell align="center">Editar</TableCell>
										<TableCell align="center">Remover</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{typeWorks
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((typeWork: TypeWork, index: number) => (
											<React.Fragment key={typeWork.flag}>
												<TableRow hover>
													<TableCell align="center">{typeWork.name}</TableCell>
													<TableCell align="center">
														<IconButton
															color="warning"
															size="small"
															onClick={() =>
																openDialog(editDialog, setEditDialog, index)
															}
														>
															<Edit />
														</IconButton>
													</TableCell>
													<TableCell align="center">
														<IconButton
															size="small"
															onClick={() =>
																openDialog(deleteDialog, setDeleteDialog, index)
															}
															color="error"
														>
															<Delete />
														</IconButton>
													</TableCell>
													<EditTypeOfWorkDialog
														state={editDialog}
														setState={setEditDialog}
														typeWork={typeWork}
														index={index}
														title="Editar Tipo de Obra"
													/>
													{/* <ConfirmActionDialog
                            message="Confirmar Exclusão"
                            action={() => handleDeleteTypeWork(typeWork)}
                            state={openDeleteDialog}
                            setState={() => setOpenDeleteDialog}
                          /> */}
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
								data={typeWorks}
							/>
						</Heading>
					</Paper>
				</Grid>
			)}
		</>
	);
}
