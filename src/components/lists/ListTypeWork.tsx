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
	Tooltip,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { TypeWork } from "../../core/models/TypeWork";
import { useDeleteTypeWork } from "../../core/network/queries/typeWork/mutations";
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

	const { typeWorks, editDialog, setTypeWorks, setEditDialog } =
		useTypeWorkStore();

	const { rowsPerPage, setRowsPerPage } = useTableStore();

	const { mutate } = useDeleteTypeWork();

	const [addTypeWorkDialog, setOpenAddTypeWorkDialog] = useState(false);
	const [page, setPage] = useState(0);

	const handleSearch = (value?: string) => {
		if (value) {
			const filteredTypeWorks = originalTypeWorks!.filter((item) =>
				item.name.toUpperCase().includes(value!.toUpperCase())
			);
			setTypeWorks(filteredTypeWorks);
		} else {
			setTypeWorks(originalTypeWorks ? originalTypeWorks : []);
		}
	};

	const handleDeleteTypeWork = useCallback((flag: number) => {
		mutate(flag);
	}, []);

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
										<TableCell align="center">Deletar</TableCell>
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
														<Tooltip title="Editar">
															<IconButton
																color="warning"
																size="small"
																onClick={() =>
																	openDialog(editDialog, setEditDialog, index)
																}
															>
																<Edit />
															</IconButton>
														</Tooltip>
													</TableCell>
													<TableCell align="center">
														<Tooltip title="Deletar">
															<IconButton
																size="small"
																onClick={() =>
																	handleDeleteTypeWork(typeWork.flag)
																}
																color="error"
															>
																<Delete />
															</IconButton>
														</Tooltip>
													</TableCell>
													<EditTypeOfWorkDialog
														state={editDialog}
														setState={setEditDialog}
														typeWork={typeWork}
														index={index}
														title="Editar Tipo de Obra"
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
								data={typeWorks}
							/>
						</Heading>
					</Paper>
				</Grid>
			)}
		</>
	);
}
