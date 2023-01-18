import { Delete, Mail } from "@mui/icons-material";
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
import { useMutation, useQuery, useQueryClient } from "react-query";

import { CallServiceQuery } from "../../core/network/services/CallService";
import { useTableStore } from "../../core/store/table";
import { useUserStore } from "../../core/store/user";
import { convertEphocDate } from "../../utils/mapper";
import { OpenMessagesDialog } from "../Dialogs/Notification/OpenMessagesDialog";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";
import { Notify } from "../Toast/Notify";

export function ListCallsHistory() {
	const user = useUserStore((state) => state.user);
	const { rowsPerPage, setRowsPerPage } = useTableStore();
	const queryClient = useQueryClient();

	const [page, setPage] = useState(0);
	const [openMessages, setOpenMessages] = useState<boolean[]>([]);

	const { data: calls, isLoading } = useQuery(
		["getUserCallsHistory", user.email],
		() => CallServiceQuery.getLoggedUserCallsHistory(user.email),
		{
			onSuccess(data) {
				setOpenMessages(Array(data.length).fill(false));
			},
		}
	);

	const { mutate: deleteCall } = useMutation(CallServiceQuery.deleteCall);

	const handleDeleteCall = (callId: string) => {
		deleteCall(callId, {
			onSuccess: () => {
				queryClient.invalidateQueries(["getUserCallsHistory", user.email]);
				Notify("Chamado excluído com sucesso!", "bottom-left", "success");
			},
		});
	};

	const handleOpenMessages = (index: number) => {
		setOpenMessages(
			openMessages.map((s, position) => (position === index ? true : s))
		);
	};

	const isUserAdmin = user.role === "ADMIN";

	return (
		<>
			{isLoading || !calls ? (
				<LoadingTableData
					headingTitle="Histórico de Chamados"
					headingSteps={[
						{
							title: "Dashboard",
							url: "/",
						},
						{
							title: "Histórico de Chamados",
							url: "/calls/history",
						},
					]}
				/>
			) : (
				<Grid style={{ width: "100%", marginTop: 14 }} item>
					<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
						<Heading
							title="Histórico de Chamados"
							steps={[
								{
									title: "Dashboard",
									url: "/",
								},
								{
									title: "Histórico de Chamados",
									url: "/calls",
								},
							]}
						>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell align="center">Título</TableCell>
										<TableCell align="center">Aberto em</TableCell>
										<TableCell align="center">Fehado em</TableCell>
										<TableCell align="left">
											{isUserAdmin ? "Enviado Para" : "Recebido de"}
										</TableCell>
										<TableCell align="center">Mensagens</TableCell>
										<TableCell align="center">Excluir</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{calls
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((call, index) => (
											<React.Fragment key={call.id}>
												<TableRow>
													<TableCell align="center">{call.title}</TableCell>
													<TableCell align="center">
														{convertEphocDate(call.created_at)}
													</TableCell>
													<TableCell align="center">
														{convertEphocDate(call.closed_at)}
													</TableCell>
													<TableCell align="left">
														{isUserAdmin ? call.user_email : call.admin_email}
													</TableCell>
													<TableCell align="center">
														<Tooltip title="Abrir mensagens">
															<IconButton
																onClick={() => handleOpenMessages(index)}
																color="info"
																size="small"
															>
																<Mail />
															</IconButton>
														</Tooltip>
													</TableCell>
													<TableCell align="center">
														<Tooltip title="Fechar Chamado">
															<IconButton
																onClick={() => handleDeleteCall(call.id)}
																color="error"
																size="small"
															>
																<Delete />
															</IconButton>
														</Tooltip>
													</TableCell>
												</TableRow>
												<OpenMessagesDialog
													state={openMessages}
													setState={setOpenMessages}
													call={call}
													index={index}
													open={false}
												/>
											</React.Fragment>
										))}
								</TableBody>
								<TablePagination
									data={calls}
									page={page}
									setPage={setPage}
									rowsPerPage={rowsPerPage}
									setRowsPerPage={setRowsPerPage}
								/>
							</Table>
						</Heading>
					</Paper>
				</Grid>
			)}
		</>
	);
}
