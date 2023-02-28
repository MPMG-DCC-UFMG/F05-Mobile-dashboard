import {
	Collections,
	Delete,
	ManageSearch,
	Notifications,
} from "@mui/icons-material";
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
import React, { useState } from "react";
import { useDeleteCollect } from "../../core/network/queries/collect/mutations";
import { useLoadCitizenCollects } from "../../core/network/queries/collect/queries";
import { useCollectStore } from "../../core/store/collect";
import { useNotificationsStore } from "../../core/store/notification";
import { useTableStore } from "../../core/store/table";
import { openDialog } from "../../utils/dialogHandler";
import { collectStatusMapping, convertEphocDate } from "../../utils/mapper";
import { CollectSubmissionDialog } from "../Dialogs/Collect/CollectSubmission";
import { PushNotificationDialog } from "../Dialogs/Notification/PushNotification";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";

export function ListCitizenCollects() {
	const { data: originalData, isLoading } = useLoadCitizenCollects();
	const { collectsDialog, setCollectsDialog, collects, setCollects } =
		useCollectStore();
	const { sendNotificationDialog, setSendNotificationDialog } =
		useNotificationsStore();
	const { rowsPerPage, setRowsPerPage } = useTableStore();
	const [page, setPage] = useState(0);
	const { mutate } = useDeleteCollect();
	
	const handleDeleteCollect = (collectId: string) => {
		mutate(collectId);
	};

	const handleSearch = (search: string) => {
		if (search) {
			setCollects(
				originalData!.filter((value) =>
					value.user_email.toUpperCase().includes(search.toUpperCase())
				)
			);
		} else {
			setCollects(originalData ? originalData : []);
		}
	};

	return (
		<>
			{isLoading || !collects ? (
				<LoadingTableData
					headingTitle="Vistorias Cidadãs"
					headingSteps={[
						{
							title: "Dashboard",
							url: "/",
						},
						{
							title: "Vistorias Cidadãs",
							url: "/",
						},
					]}
				/>
			) : (
				<Grid style={{ width: "100%", marginTop: 14 }} item>
					<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
						<Heading
							title="Vistorias Cidadãs"
							steps={[
								{
									title: "Dashboard",
									url: "/",
								},
								{
									title: "Vistorias Cidadãs",
									url: "/",
								},
							]}
						>
							<Grid item display="flex" padding={2} justifyContent="flex-Start">
								<TextField
									fullWidth
									size="small"
									onChange={(e) => handleSearch(e.target.value)}
									label="Filtrar Vistorias"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<ManageSearch />
											</InputAdornment>
										),
									}}
								/>
								<IconButton />
							</Grid>
							<Divider />
							<Table>
								<TableHead>
									<TableRow>
										<TableCell align="center">Usuário Responsável</TableCell>
										<TableCell align="center">Data</TableCell>
										<TableCell align="left">Status da Coleta</TableCell>
										<TableCell align="left">Comentário Geral</TableCell>
										<TableCell align="center">Mídias</TableCell>
										<TableCell align="center">Excluir</TableCell>
										<TableCell align="center">Notificar</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{collects
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((collect, index) => (
											<React.Fragment key={collect.id}>
												<TableRow>
													<TableCell align="center">
														{collect.user_email}
													</TableCell>
													<TableCell align="center">
														{convertEphocDate(collect.date)}
													</TableCell>
													<TableCell align="left">
														{collectStatusMapping(collect.queue_status)}
													</TableCell>
													<TableCell align="left">{collect.comments}</TableCell>
													<TableCell align="center">
														<Tooltip title="Envios">
															<IconButton
																color="info"
																size="small"
																onClick={() =>
																	openDialog(
																		collectsDialog,
																		setCollectsDialog,
																		index
																	)
																}
															>
																<Collections />
															</IconButton>
														</Tooltip>
													</TableCell>
													<TableCell align="center">
														<Tooltip title="Excluir">
															<IconButton
																onClick={() => handleDeleteCollect(collect.id)}
																color="error"
																size="small"
															>
																<Delete />
															</IconButton>
														</Tooltip>
													</TableCell>
													<TableCell>
														<Tooltip title="Notificar">
															<IconButton
																onClick={() =>
																	openDialog(
																		sendNotificationDialog,
																		setSendNotificationDialog,
																		index
																	)
																}
																size="small"
															>
																<Notifications htmlColor="#FFCC00" />
															</IconButton>
														</Tooltip>
													</TableCell>
												</TableRow>
												<CollectSubmissionDialog
													collect={collect}
													index={index}
													state={collectsDialog}
													setState={setCollectsDialog}
													fullScreen
													// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
													title={`Envios - ${collect.id!}`}
												/>
												<PushNotificationDialog
													state={sendNotificationDialog}
													setState={setSendNotificationDialog}
													index={index}
													userToken={collect.user_email}
												/>
											</React.Fragment>
										))}
								</TableBody>
							</Table>
							<TablePagination
								data={collects}
								rowsPerPage={rowsPerPage}
								setRowsPerPage={setRowsPerPage}
								page={page}
								setPage={setPage}
							/>
						</Heading>
					</Paper>
				</Grid>
			)}
		</>
	);
}
