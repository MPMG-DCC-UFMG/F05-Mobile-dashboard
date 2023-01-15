import { Block, Mail } from "@mui/icons-material";
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
import { OpenMessagesDialog } from "../Dialogs/Call/OpenMessagesDialog";
import { Heading } from "../Heading";
import { LoadingTableData } from "../Loading/LoadingTableData";
import { TablePagination } from "../TablePagination";
import { Notify } from "../Toast/Notify";

export function ListCalls() {
	const user = useUserStore((state) => state.user);
	const { rowsPerPage, setRowsPerPage } = useTableStore();
	const queryClient = useQueryClient();

	const [page, setPage] = useState(0);
	const [openMessages, setOpenMessages] = useState<boolean[]>([]);

	const { data: calls, isLoading } = useQuery(
		["getUserCalls", user.email],
		() => CallServiceQuery.getLoggedUserCalls(user.email),
		{
			onSuccess(data) {
				setOpenMessages(Array(data.length).fill(false));
			},
		}
	);

	const { mutate: closeCall } = useMutation(CallServiceQuery.closeCall);

	const handleOpenMessages = (index: number) => {
		setOpenMessages(
			openMessages.map((s, position) => (position === index ? true : s))
		);
	};

	const handleCloseCall = (callId: string) => {
		closeCall(callId, {
			onSuccess: () => {
				queryClient.invalidateQueries(["getUserCalls", user.email]);
				Notify(
					"Chamado fechado com sucesso! Pode acessá-lo em Chamados/Histórico",
					"bottom-left",
					"success"
				);
			},
		});
	};

	const isUserAdmin = user.role === "ADMIN";

	return (
		<>
			{isLoading || !calls ? (
				<LoadingTableData
					headingTitle="Meus Chamados"
					headingSteps={[
						{
							title: "Dashboard",
							url: "/",
						},
						{
							title: "Meus Chamados",
							url: "/calls",
						},
					]}
				/>
			) : (
				<Grid style={{ width: "100%", marginTop: 14 }} item>
					<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
						<Heading
							title="Meus Chamados"
							steps={[
								{
									title: "Dashboard",
									url: "/",
								},
								{
									title: "Meus Chamados",
									url: "/calls",
								},
							]}
						>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell align="center">Título</TableCell>
										<TableCell align="center">Aberto Em</TableCell>
										<TableCell align="left">
											{isUserAdmin ? "Enviado Para" : "Recebido de"}
										</TableCell>
										<TableCell align="center">Mensagens</TableCell>
										{isUserAdmin && (
											<TableCell align="center">Fechar</TableCell>
										)}
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
													{isUserAdmin && (
														<TableCell align="center">
															<Tooltip title="Fechar Chamado">
																<IconButton
																	onClick={() => handleCloseCall(call.id)}
																	color="warning"
																	size="small"
																>
																	<Block />
																</IconButton>
															</Tooltip>
														</TableCell>
													)}
												</TableRow>
												<OpenMessagesDialog
													state={openMessages}
													setState={setOpenMessages}
													call={call}
													index={index}
												/>
											</React.Fragment>
										))}
								</TableBody>
							</Table>
							<TablePagination
								data={calls}
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
