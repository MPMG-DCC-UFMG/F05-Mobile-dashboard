import { Check, Close, Visibility } from "@mui/icons-material";
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
import React, { useState } from "react";
import { useQuery } from "react-query";
import { PublicWork } from "../../core/models/PublicWork";
import { WorkStatus } from "../../core/models/WorkStatus";
import { PublicWorkServiceQuery } from "../../core/network/services/PublicWorkService";
import { WorkStatusServiceQuery } from "../../core/network/services/WorkStatusService";
import { EvaluateQueueItemDialog } from "../Dialogs/Queue/EvaluateQueueItem";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";
import { WarningField } from "../WarningField";

export function ListQueue() {
	const [openEvaluateCollect, setOpenEvaluateCollect] = useState<boolean[]>([]);
	const { data: queue, isLoading } = useQuery<PublicWork[]>(
		["PublicWorksWithCollectsInQueue"],
		() => PublicWorkServiceQuery.getPublicWorksWithCollectsInQueue(),
		{
			onSuccess(data) {
				setOpenEvaluateCollect(Array(data.length).fill(false));
			},
		}
	);

	const { data: workStatus } = useQuery<WorkStatus[]>(["getWorkStatus"], () =>
		WorkStatusServiceQuery.loadWorkStatus()
	);

	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [page, setPage] = useState(0);

	const handleOpenEvaluateDialog = (index: number) => {
		setOpenEvaluateCollect(
			openEvaluateCollect.map((s, pos) => (pos === index ? true : s))
		);
	};

	return (
		<>
			{isLoading || !queue ? (
				<LoadingTableData
					headingTitle="Fila de Envios"
					headingSteps={[
						{
							title: "Dashboard",
							url: "/dashboard",
						},
						{
							title: "Fila de Envios",
							url: "/",
						},
					]}
				/>
			) : queue && queue.length > 0 ? (
				<Grid style={{ width: "100%", marginTop: 14 }} item>
					<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
						<Heading
							title="Fila de Envios"
							steps={[
								{
									title: "Dashboard",
									url: "/dashboard",
								},
								{
									title: "Fila de Envios",
									url: "/",
								},
							]}
						>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell align="center">Obra</TableCell>
										<TableCell align="center">Estado da Obra</TableCell>
										<TableCell align="center">Avaliar</TableCell>
										<TableCell align="center">Aceitar</TableCell>
										<TableCell align="center">Recusar</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{queue
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((public_work: PublicWork, index: number) => (
											<React.Fragment key={public_work.id}>
												<TableRow>
													<TableCell align="center">
														{public_work.name}
													</TableCell>
													<TableCell align="center">
														{workStatus
															? workStatus.find(
																(status) =>
																	status.flag === public_work.user_status
															)?.name
															: ""}
													</TableCell>

													<TableCell align="center">
														<Tooltip title="Avaliar">
															<IconButton
																onClick={() => handleOpenEvaluateDialog(index)}
															>
																<Visibility />
															</IconButton>
														</Tooltip>
													</TableCell>
													<TableCell align="center">
														<Tooltip title="Aceitar">
															<IconButton>
																<Check color="success" />
															</IconButton>
														</Tooltip>
													</TableCell>
													<TableCell align="center">
														<Tooltip title="Recusar">
															<IconButton>
																<Close color="error" />
															</IconButton>
														</Tooltip>
													</TableCell>
												</TableRow>
												<EvaluateQueueItemDialog
													publicWork={public_work}
													index={index}
													state={openEvaluateCollect}
													setState={setOpenEvaluateCollect}
													title={"Avaliação de Vistoria Cidadã"}
													fullScreen
												/>
											</React.Fragment>
										))}
								</TableBody>
							</Table>
							<TablePagination
								data={queue}
								page={page}
								setPage={setPage}
								rowsPerPage={rowsPerPage}
								setRowsPerPage={setRowsPerPage}
							/>
						</Heading>
					</Paper>
				</Grid>
			) : (
				<WarningField
					title="Não há nenhuma Vistoria Cidadã para ser avaliada"
					message="Todas Vistorias constam em suas respectivas sessões."
					severity="warning"
				/>
			)}
		</>
	);
}
