import { Mail } from "@mui/icons-material";
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
import { useGetAllNotifications } from "../../core/network/queries/notification/queries";
import { useNotificationsStore } from "../../core/store/notification";
import { useTableStore } from "../../core/store/table";
import { openDialog } from "../../utils/dialogHandler";
import { convertEphocDate } from "../../utils/mapper";
import { OpenMessagesDialog } from "../Dialogs/Notification/OpenMessagesDialog";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";

export function ListNotifications() {
	const { rowsPerPage, setRowsPerPage } = useTableStore();
	const { isLoading } = useGetAllNotifications();
	const { notifications, commentsDialog, setCommentsDialog } =
		useNotificationsStore();

	const [page, setPage] = useState(0);

	return (
		<>
			{isLoading || !notifications ? (
				<LoadingTableData
					headingTitle="Notificações"
					headingSteps={[
						{
							title: "Dashboard",
							url: "/",
						},
						{
							title: "Notificações",
							url: "/calls",
						},
					]}
				/>
			) : (
				<Grid style={{ width: "100%", marginTop: 14 }} item>
					<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
						<Heading
							title="Notificações"
							steps={[
								{
									title: "Dashboard",
									url: "/",
								},
								{
									title: "Notificações",
									url: "/calls",
								},
							]}
						>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell align="center">Título</TableCell>
										<TableCell align="center">Aberto Em</TableCell>
										<TableCell align="left">Enviado Para</TableCell>
										<TableCell align="center">Mensagens</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{notifications
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((notification, index) => (
											<React.Fragment key={notification.id}>
												<TableRow>
													<TableCell align="center">
														{notification.title}
													</TableCell>
													<TableCell align="center">
														{convertEphocDate(notification.timestamp)}
													</TableCell>
													<TableCell align="left">
														{notification.user_email}
													</TableCell>
													<TableCell align="center">
														<Tooltip title="Abrir mensagens">
															<IconButton
																onClick={() =>
																	openDialog(
																		commentsDialog,
																		setCommentsDialog,
																		index
																	)
																}
																color="info"
																size="small"
															>
																<Mail />
															</IconButton>
														</Tooltip>
													</TableCell>
												</TableRow>
												<OpenMessagesDialog
													state={commentsDialog}
													setState={setCommentsDialog}
													notification={notification}
													index={index}
												/>
											</React.Fragment>
										))}
								</TableBody>
							</Table>
							<TablePagination
								data={notifications}
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
