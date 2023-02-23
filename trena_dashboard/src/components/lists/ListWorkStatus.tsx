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
import { WorkStatus } from "../../core/models/WorkStatus";
import { useDeleteWorkStatus } from "../../core/network/queries/workStatus/mutations";
import { useLoadWorkStatus } from "../../core/network/queries/workStatus/queries";
import { useTableStore } from "../../core/store/table";
import { useWorkStatusStore } from "../../core/store/workStatus";
import { openDialog } from "../../utils/dialogHandler";
import { AddWorkStatusDialog } from "../Dialogs/StatusWork/AddWorkStatusDialog";
import { EditWorkStatusDialog } from "../Dialogs/StatusWork/EditWorkStatusDialog";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";

export function ListWorkStatus() {
	const { data: originalData, isLoading } = useLoadWorkStatus();
	const { workStatus, setWorkStatus, editDialog, setEditDialog } =
		useWorkStatusStore();
	const { rowsPerPage, setRowsPerPage } = useTableStore();
	const { mutate } = useDeleteWorkStatus();
	const [addWorkStatusDialog, setOpenAddWorkStatusDialog] = useState(false);
	const [page, setPage] = useState(0);

	const handleSearch = (value?: string) => {
		if (value) {
			const filteredWorkStatus = workStatus.filter((item) =>
				item.name.toUpperCase().includes(value.toUpperCase())
			);
			setWorkStatus(filteredWorkStatus);
		} else {
			setWorkStatus(originalData ? originalData : []);
		}
	};

	const handleDeleteWorkStatus = useCallback((flag: number) => {
		mutate(flag);
	}, []);

	return (
		<>
			{isLoading || !workStatus ? (
				<LoadingTableData
					headingAction={() => setOpenAddWorkStatusDialog(true)}
					headingTitle="Estado das Obras"
					headingButtonTitle="Adicionar Estado de Obra"
					headingSteps={[
						{ title: "Dashboard", url: "/" },
						{ title: "Estado das Obras", url: "/" },
					]}
				/>
			) : (
				<Grid style={{ width: "100%", marginTop: 14 }} item xs={12}>
					<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
						<Heading
							buttonTitle="Adicionar Estado de Obra"
							title="Estado das Obras"
							steps={[
								{ title: "Dashboard", url: "/" },
								{ title: "Estado das Obras", url: "/" },
							]}
							handleAction={() => setOpenAddWorkStatusDialog(true)}
						>
							<AddWorkStatusDialog
								state={addWorkStatusDialog}
								setState={setOpenAddWorkStatusDialog}
								title="Adicionar Estado De Obra"
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
										<TableCell align="center">Decrição</TableCell>
										<TableCell align="center">Editar</TableCell>
										<TableCell align="center">Deletar</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{workStatus
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((workStatus: WorkStatus, index: number) => (
											<TableRow hover key={workStatus.flag}>
												<TableCell align="center">{workStatus.name}</TableCell>
												<TableCell align="center">
													{workStatus.description}
												</TableCell>
												<TableCell align="center">
													<Tooltip title="Editar">
														<IconButton
															color="warning"
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
															onClick={() =>
																handleDeleteWorkStatus(workStatus.flag)
															}
															color="error"
														>
															<Delete />
														</IconButton>
													</Tooltip>
												</TableCell>
												<EditWorkStatusDialog
													state={editDialog}
													setState={setEditDialog}
													workStatus={workStatus}
													index={index}
													title="Editar Estado Da Obra"
												/>
											</TableRow>
										))}
								</TableBody>
							</Table>
							<TablePagination
								rowsPerPage={rowsPerPage}
								setRowsPerPage={setRowsPerPage}
								page={page}
								setPage={setPage}
								data={workStatus}
							/>
						</Heading>
					</Paper>
				</Grid>
			)}
		</>
	);
}
