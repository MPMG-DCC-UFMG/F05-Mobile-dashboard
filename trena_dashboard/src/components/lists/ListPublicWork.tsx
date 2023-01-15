import React, { useState } from "react";

import { Edit } from "@material-ui/icons";
import { Delete, LocalSee, Map, PendingActions } from "@mui/icons-material";
import {
	Autocomplete,
	Grid,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
	Tooltip,
} from "@mui/material";
import { useQuery } from "react-query";
import { Address } from "../../core/models/Address";
import { TypeWork } from "../../core/models/TypeWork";
import { useLoadPublicWorks } from "../../core/network/queries/publicWork/queries";
import { TypeWorkServiceQuery } from "../../core/network/services/TypeWorkService";
import { usePublicWorkStore } from "../../core/store/publicWork";
import { useTableStore } from "../../core/store/table";
import { openDialog } from "../../utils/dialogHandler";
import { DelegateInspectionDialog } from "../Dialogs/Inspection/DelegateInspection";
import { MapDialog } from "../Dialogs/MapDialog";
import { AddPublicWorkDialog } from "../Dialogs/PublicWork/AddPublicWorkDialog";
import { HandlePublicWorkDialog } from "../Dialogs/PublicWork/HandlePublicWorkDialog";
import { PublicWorkInspectionsDialog } from "../Dialogs/PublicWork/PublicWorkInspectionsDialog";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";

export function ListPublicWork() {
	const {
		data: originalPublicWorks,
		isLoading,
		isFetched,
	} = useLoadPublicWorks();
	const { rowsPerPage, setRowsPerPage } = useTableStore();
	const [page, setPage] = useState(0);

	const {
		publicWorks,
		setPublicWorks,
		actionDialog,
		setActionDialog,
		localizationDialog,
		setLocalizationDialog,
		inspectionsDialog,
		setInspectionsDialog,
		addInspection,
		setAddInspection,
	} = usePublicWorkStore();

	const [openAddPublicWorkDialog, setOpenAddPublicWorkDialog] = useState(false);

	const { data: typeWork } = useQuery<TypeWork[]>(
		["getTypeWork"],
		TypeWorkServiceQuery.loadTypeWorks
	);

	const [actionMode, setActionMode] = useState<"edit" | "delete">("edit");

	const handleOpenActionModal = (index: number, mode: "edit" | "delete") => {
		setActionMode(mode);
		openDialog(actionDialog, setActionDialog, index);
	};

	const addressFormatter = (adress: Address) =>
		`${adress.street}, ${adress.number} - ${adress.city}`;

	const filterOptions = ["Escola", "Creche"];

	const handleSearch = (name: string) => {
		const typeworkFilter = typeWork?.find(
			(value) => value.name.toLowerCase() === name.toLowerCase()
		);
		if (name !== "") {
			const filteredPublicWorks = publicWorks.filter(
				(item) => item.type_work_flag === typeworkFilter?.flag
			);
			setPublicWorks(filteredPublicWorks);
		} else {
			setPublicWorks(originalPublicWorks ? originalPublicWorks : publicWorks);
		}
	};

	return (
		<>
			{isLoading || !publicWorks ? (
				<LoadingTableData
					headingButtonTitle="Adicionar Obra Pública"
					headingTitle="Obras Públicas"
					headingAction={() => setOpenAddPublicWorkDialog(true)}
					headingSteps={[
						{ title: "Dashboard", url: "/" },
						{ title: "Obras Públicas", url: "/" },
					]}
				/>
			) : (
				isFetched && (
					<Grid style={{ width: "100%", marginTop: 14 }} item>
						<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
							<Heading
								buttonTitle="Adicionar Obra Pública"
								title="Obras Públicas"
								steps={[
									{ title: "Dashboard", url: "/" },
									{ title: "Obras Públicas", url: "/" },
								]}
								handleAction={() => setOpenAddPublicWorkDialog(true)}
							>
								<Grid sx={{ justifyContent: "flex-end", display: "flex" }}>
									<Autocomplete
										sx={{
											width: 200,
										}}
										disablePortal
										renderInput={(params) => (
											<TextField {...params} label="Filtrar por tipo de obra" />
										)}
										options={filterOptions}
										onChange={(e, value) =>
											value === null ? handleSearch("") : handleSearch(value)
										}
									/>
								</Grid>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell align="center">Nome</TableCell>
											<TableCell align="center">Tipo de Obra</TableCell>
											<TableCell align="center">Endereço</TableCell>
											<TableCell align="center">Localização</TableCell>
											<TableCell align="center">Vistorias</TableCell>
											<TableCell align="center">Nova Vistoria</TableCell>
											<TableCell align="center">Editar</TableCell>
											<TableCell align="center">Deletar</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{publicWorks
											.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
											)
											.map((publicWork, index: number) => (
												<TableRow key={publicWork.id}>
													<TableCell align="center">
														{publicWork.name}
													</TableCell>
													<TableCell align="center">
														{typeWork?.map((value) =>
															value.flag === publicWork.type_work_flag
																? value.name
																: ""
														)}
													</TableCell>
													<TableCell align="center">
														{addressFormatter(publicWork.address)}
													</TableCell>
													<TableCell align="center">
														<Tooltip title="Mapa">
															<IconButton
																onClick={() =>
																	openDialog(
																		localizationDialog,
																		setLocalizationDialog,
																		index
																	)
																}
																size="small"
															>
																<Map htmlColor="#4caf50" />
															</IconButton>
														</Tooltip>
													</TableCell>
													<TableCell align="center">
														<Tooltip title="Vistorias">
															<IconButton
																color="info"
																size="small"
																onClick={() =>
																	openDialog(
																		inspectionsDialog,
																		setInspectionsDialog,
																		index
																	)
																}
															>
																<LocalSee />
															</IconButton>
														</Tooltip>
													</TableCell>
													<TableCell align="center">
														<Tooltip title="Adicionar Vistoria">
															<IconButton
																color="info"
																size="small"
																onClick={() =>
																	openDialog(
																		addInspection,
																		setAddInspection,
																		index
																	)
																}
															>
																<PendingActions />
															</IconButton>
														</Tooltip>
													</TableCell>
													<TableCell align="center">
														<Tooltip title="Editar">
															<IconButton
																color="warning"
																size="small"
																onClick={() =>
																	handleOpenActionModal(index, "edit")
																}
															>
																<Edit />
															</IconButton>
														</Tooltip>
													</TableCell>
													<TableCell align="center">
														<Tooltip title="Deletar">
															<IconButton
																color="error"
																size="small"
																onClick={() =>
																	handleOpenActionModal(index, "delete")
																}
															>
																<Delete />
															</IconButton>
														</Tooltip>
													</TableCell>
													<MapDialog
														state={localizationDialog}
														setState={setLocalizationDialog}
														publicWork={publicWork}
														index={index}
														fullScreen
													/>
													<PublicWorkInspectionsDialog
														state={inspectionsDialog}
														setState={setInspectionsDialog}
														publicWorkId={publicWork.id}
														index={index}
														title={`Vistorias: ${publicWork.name}`}
													/>
													<HandlePublicWorkDialog
														state={actionDialog}
														setState={setActionDialog}
														index={index}
														mode={actionMode}
														publicWork={publicWork}
														title={
															actionMode === "edit"
																? "Editar Obra Pública"
																: "Deletar Obra Pública"
														}
														fullScreen
													/>
													<DelegateInspectionDialog
														index={index}
														publicWork={publicWork}
														state={addInspection}
														setState={setAddInspection}
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
									data={publicWorks}
								/>
								<AddPublicWorkDialog
									state={openAddPublicWorkDialog}
									setState={setOpenAddPublicWorkDialog}
									title="Nova Obra Pública"
									fullScreen={true}
								/>
							</Heading>
						</Paper>
					</Grid>
				)
			)}
		</>
	);
}
