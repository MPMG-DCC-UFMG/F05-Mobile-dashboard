import { Check, Close, ContentPaste } from "@mui/icons-material";
import {
	Grid,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Tooltip,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { PublicWork } from "../../core/models/PublicWork";
import {
	useAcceptPublicWork,
	useRefusePublicWork,
} from "../../core/network/queries/queue/mutations";
import { useLoadPublicWorkQueue } from "../../core/network/queries/queue/queries";
import { useQueueStore } from "../../core/store/queue";
import { useTableStore } from "../../core/store/table";
import { openDialog } from "../../utils/dialogHandler";
import { addressFormatter } from "../../utils/mapper";
import { EvaluatePublicQueueDialog } from "../Dialogs/Queue/EvaluatePublicQueueItem";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";
import { WarningField } from "../WarningField";

export function ListPublicWorkQueue() {
	const { isLoading } = useLoadPublicWorkQueue();
	const {
		evaluatePublicWorkDialog,
		setEvaluatePublicWorkDialog,
		publicWorkQueue,
	} = useQueueStore();
	const { rowsPerPage, setRowsPerPage } = useTableStore();
	const [page, setPage] = useState(0);

	const { mutate: acceptPublicWork } = useAcceptPublicWork();
	const { mutate: refusePublicWork } = useRefusePublicWork();

	const handleAcceptPublicWork = useCallback((publicWork: PublicWork) => {
		acceptPublicWork({
			...publicWork,
			queue_status: 1,
			queue_status_date: Date.now(),
		});
	}, []);

	const handleRefusePublicWork = useCallback((publicWork: PublicWork) => {
		refusePublicWork({
			...publicWork,
			queue_status: 2,
			queue_status_date: Date.now(),
		});
	}, []);

	return (
		<>
			{isLoading ||
				(!publicWorkQueue && (
					<LoadingTableData
						headingTitle="Fila de Obras"
						headingSteps={[
							{
								title: "Dashboard",
								url: "/",
							},
							{
								title: "Fila de Obras",
								url: "/publicWork/queue",
							},
						]}
					/>
				))}
			{!isLoading && publicWorkQueue && publicWorkQueue.length === 0 ? (
				<WarningField
					title="Não há Obras na Fila!"
					message="No momento não há nenhuma Obra para ser validada."
					severity="warning"
				/>
			) : (
				<Grid style={{ width: "100%", marginTop: 14 }} item>
					<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
						<Heading
							title="Fila de Obras"
							steps={[
								{
									title: "Dashboard",
									url: "/",
								},
								{
									title: "Fila de Obras",
									url: "/publicWorks/queue",
								},
							]}
						>
							{publicWorkQueue && (
								<>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell align="center">Nome</TableCell>
												<TableCell align="center">Endereço</TableCell>
												<TableCell align="center">Avaliar</TableCell>
												<TableCell align="center">Aprovar</TableCell>
												<TableCell align="center">Recusar</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{publicWorkQueue
												.slice(
													page * rowsPerPage,
													page * rowsPerPage + rowsPerPage
												)
												.map((publicWork, index) => (
													<React.Fragment key={publicWork.id}>
														<TableRow>
															<TableCell align="center">
																{publicWork.name}
															</TableCell>
															<TableCell align="center">
																{addressFormatter(publicWork.address)}
															</TableCell>
															<TableCell align="center">
																<Tooltip title="Avaliar">
																	<IconButton
																		color="info"
																		size="small"
																		onClick={() =>
																			openDialog(
																				evaluatePublicWorkDialog,
																				setEvaluatePublicWorkDialog,
																				index
																			)
																		}
																	>
																		<ContentPaste />
																	</IconButton>
																</Tooltip>
															</TableCell>
															<TableCell align="center">
																<Tooltip title="Aprovar">
																	<IconButton
																		onClick={() =>
																			handleAcceptPublicWork(publicWork)
																		}
																		color="success"
																		size="small"
																	>
																		<Check />
																	</IconButton>
																</Tooltip>
															</TableCell>
															<TableCell align="center">
																<Tooltip title="Recusar">
																	<IconButton
																		onClick={() =>
																			handleRefusePublicWork(publicWork)
																		}
																		color="error"
																		size="small"
																	>
																		<Close />
																	</IconButton>
																</Tooltip>
															</TableCell>
														</TableRow>
														<EvaluatePublicQueueDialog
															index={index}
															state={evaluatePublicWorkDialog}
															setState={setEvaluatePublicWorkDialog}
															fullScreen
															publicWork={publicWork}
															title={`Avaliação de Obra Pública - ${publicWork.name}`}
														/>
													</React.Fragment>
												))}
										</TableBody>
									</Table>
									<TablePagination
										data={publicWorkQueue}
										rowsPerPage={rowsPerPage}
										setRowsPerPage={setRowsPerPage}
										page={page}
										setPage={setPage}
									/>
								</>
							)}
						</Heading>
					</Paper>
				</Grid>
			)}
		</>
	);
}
