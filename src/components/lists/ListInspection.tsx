import {
	FileDownloadOutlined,
	Collections,
	ManageSearch,
	Notifications,
	PictureAsPdfOutlined,
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
import React, { useCallback, useState } from "react";
import {
	useDownloadDocx,
	useDownloadPdf,
} from "../../core/network/queries/inspection/mutations";
import { useLoadInspections } from "../../core/network/queries/inspection/queries";
import { useInspectionStore } from "../../core/store/inspection";
import { useNotificationsStore } from "../../core/store/notification";
import { useTableStore } from "../../core/store/table";
import { openDialog } from "../../utils/dialogHandler";
import { convertEphocDate, inspectionsStatusMapping } from "../../utils/mapper";
import { InspectionCollectsDialog } from "../Dialogs/Inspection/InspectionCollects";
import { NotificationsDialog } from "../Dialogs/Notification/NotificationsDialog";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";

export function ListInspection() {
	const { data: originalData, isLoading, isFetched } = useLoadInspections();
	const { inspections, setInspections, collectModal, setCollectModal } =
		useInspectionStore();
	const [page, setPage] = useState(0);
	const { rowsPerPage, setRowsPerPage } = useTableStore();
	const { inspectionNotificationsDialog, setInspectionNotificationsDialog } =
		useNotificationsStore();

	const { mutate: downloadPdf } = useDownloadPdf();
	const { mutate: downloadDocx } = useDownloadDocx();

	const handleGenerateReport = useCallback((flag: number) => {
		downloadPdf(flag);
	}, []);

	const handleGenerateDoc = useCallback((flag: number) => {
		downloadDocx(flag);
	}, []);

	const handleSearch = (search: string) => {
		if (search) {
			setInspections(
				originalData!.filter((value) =>
					value.name.toUpperCase().includes(search.toUpperCase())
				)
			);
		} else {
			setInspections(originalData ? originalData : []);
		}
	};

	return (
		<>
			{isLoading || !inspections ? (
				<LoadingTableData
					headingTitle="Vistorias Técnicas"
					headingSteps={[
						{
							title: "Dashboard",
							url: "/dashboard",
						},
						{
							title: "Vistorias Técnicas",
							url: "/",
						},
					]}
				/>
			) : (
				isFetched && (
					<Grid style={{ width: "100%", marginTop: 14 }} item>
						<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
							<Heading
								title="Vistorias Técnicas"
								steps={[
									{
										title: "Dashboard",
										url: "/dashboard",
									},
									{
										title: "Vistorias Técnicas",
										url: "/",
									},
								]}
							>
								<Grid
									item
									display="flex"
									padding={2}
									justifyContent="flex-Start"
								>
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
											<TableCell align="left">Número de Inquérito</TableCell>
											<TableCell align="center">Vistoria</TableCell>
											<TableCell align="center">Vistoriador</TableCell>
											<TableCell align="center">Criada em</TableCell>
											<TableCell align="center">Prazo</TableCell>
											<TableCell align="center">Status</TableCell>
											<TableCell align="center">Mídias</TableCell>
											<TableCell align="center">Relatório</TableCell>
											<TableCell align="center">Relatório Editável</TableCell>
											<TableCell align="center">Notificações</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{inspections
											.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
											)
											.map((inspection, index) => (
												<React.Fragment key={inspection.flag}>
													<TableRow>
														<TableCell align="left">
															{inspection.inquiry_number.toString()}
														</TableCell>
														<TableCell align="center">
															{inspection.name}
														</TableCell>
														<TableCell align="center">
															{inspection.user_email}
														</TableCell>
														<TableCell align="center">
															{convertEphocDate(inspection.request_date)}
														</TableCell>
														<TableCell align="center">
															{convertEphocDate(inspection.limit_date)}
														</TableCell>
														<TableCell align="center">
															{inspectionsStatusMapping(inspection.status)}
														</TableCell>
														<TableCell align="center">
															<Tooltip title="Coletas">
																<IconButton
																	color="info"
																	size="small"
																	onClick={() =>
																		openDialog(
																			collectModal,
																			setCollectModal,
																			index
																		)
																	}
																>
																	<Collections />
																</IconButton>
															</Tooltip>
														</TableCell>
														<TableCell align="center">
															<Tooltip title="Gerar Relatório">
																<IconButton
																	color="error"
																	size="small"
																	onClick={() =>
																		handleGenerateReport(inspection.flag)
																	}
																>
																	<PictureAsPdfOutlined />
																</IconButton>
															</Tooltip>
														</TableCell>
														<TableCell align="center">
															<Tooltip title="Obter Docx">
																<IconButton
																	color="info"
																	size="small"
																	onClick={() =>
																		handleGenerateDoc(inspection.flag)
																	}
																>
																	<FileDownloadOutlined />
																</IconButton>
															</Tooltip>
														</TableCell>
														<TableCell align="center">
															<Tooltip title="Notificações">
																<IconButton
																	onClick={() =>
																		openDialog(
																			inspectionNotificationsDialog,
																			setInspectionNotificationsDialog,
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
													<InspectionCollectsDialog
														index={index}
														inspectionId={inspection.flag}
														state={collectModal}
														setState={setCollectModal}
														fullScreen
														title={`${
															inspection.description
																? `${inspection.description} - `
																: "Coletas - "
														}${inspection.name}`}
													/>
													<NotificationsDialog
														index={index}
														state={inspectionNotificationsDialog}
														setState={setInspectionNotificationsDialog}
														inspection={inspection}
													/>
												</React.Fragment>
											))}
									</TableBody>
								</Table>
								<TablePagination
									rowsPerPage={rowsPerPage}
									setRowsPerPage={setRowsPerPage}
									page={page}
									setPage={setPage}
									data={inspections}
								/>
							</Heading>
						</Paper>
					</Grid>
				)
			)}
		</>
	);
}
