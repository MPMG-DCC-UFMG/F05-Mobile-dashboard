import {
	Article,
	Collections,
	PictureAsPdfOutlined,
} from "@mui/icons-material";
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
import {
	useDownloadDocx,
	useDownloadPdf,
} from "../../core/network/queries/inspection/mutations";
import { useLoadInspections } from "../../core/network/queries/inspection/queries";
import { useInspectionStore } from "../../core/store/inspection";
import { useTableStore } from "../../core/store/table";
import { convertEphocDate, inspectionsStatusMapping } from "../../utils/mapper";
import { InspectionCollectsDialog } from "../Dialogs/Inspection/InspectionCollects";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";

export function ListInspection() {
	const { data: inspections, isLoading, isFetched } = useLoadInspections();
	const { collectModal, setCollectModal } = useInspectionStore();
	const [page, setPage] = useState(0);
	const { rowsPerPage, setRowsPerPage } = useTableStore();

	const { mutate: downloadPdf } = useDownloadPdf();
	const { mutate: downloadDocx } = useDownloadDocx();

	const handleOpenCollectsModal = useCallback((index: number) => {
		setCollectModal(
			collectModal.map((value, pos) => (index === pos ? true : value))
		);
	}, []);

	const handleGenerateReport = useCallback((flag: number) => {
		downloadPdf(flag);
	}, []);

	const handleGenerateDoc = useCallback((flag: number) => {
		downloadDocx(flag);
	}, []);

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
								<Table>
									<TableHead>
										<TableRow>
											<TableCell align="left">Número de Inquérito</TableCell>
											<TableCell align="center">Vistoria</TableCell>
											<TableCell align="center">Vistoriador</TableCell>
											<TableCell align="center">Data</TableCell>
											<TableCell align="center">Status</TableCell>
											<TableCell align="center">Mídias</TableCell>
											<TableCell align="center">Relatório</TableCell>
											<TableCell align="center">Editável</TableCell>
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
															{inspectionsStatusMapping(inspection.status!)}
														</TableCell>
														<TableCell align="center">
															<Tooltip title="Coletas">
																<IconButton
																	color="info"
																	size="small"
																	onClick={() => handleOpenCollectsModal(index)}
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
																		handleGenerateReport(inspection.flag!)
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
																		handleGenerateDoc(inspection.flag!)
																	}
																>
																	<Article />
																</IconButton>
															</Tooltip>
														</TableCell>
													</TableRow>
													<InspectionCollectsDialog
														index={index}
														inspectionId={inspection.flag!}
														state={collectModal}
														setState={setCollectModal}
														fullScreen
														title={`${
															inspection.description
																? `${inspection.description} - `
																: "Coletas - "
														}${inspection.name}`}
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
									data={inspections!}
								/>
							</Heading>
						</Paper>
					</Grid>
				)
			)}
		</>
	);
}
