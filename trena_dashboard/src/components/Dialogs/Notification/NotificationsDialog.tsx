import { Add, Chat } from "@material-ui/icons";
import {
	Button,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Inspection } from "../../../core/models/Inspection";
import { useGetNotificationById } from "../../../core/network/queries/notification/queries";
import { useNotificationsStore } from "../../../core/store/notification";
import { useTableStore } from "../../../core/store/table";
import { openDialog } from "../../../utils/dialogHandler";
import { convertEphocDate } from "../../../utils/mapper";
import { TablePagination } from "../../TablePagination";
import { WarningField } from "../../WarningField";
import { TableDialogContainer } from "../DialogContainer";
import { OpenMessagesDialog } from "./OpenMessagesDialog";
import { SendNotificationDialog } from "./SendNotificationDialog";

interface NotificatiosnDialogProps {
	state: boolean[];
	setState: (state: boolean[]) => void;
	index: number;
	inspection: Inspection;
}

export function NotificationsDialog({
	state,
	setState,
	index,
	inspection,
}: NotificatiosnDialogProps) {
	const { sendNotificationDialog, setSendNotificationDialog } =
		useNotificationsStore();
	const { data: notifications } = useGetNotificationById(inspection.flag);
	const hasNotifications = notifications && notifications.length > 0;
	const [commentsDialog, setCommentsDialog] = useState(
		Array(notifications?.length).fill(false)
	);
	const { rowsPerPage, setRowsPerPage } = useTableStore();
	const [page, setPage] = useState(0);

	useEffect(() => {
		setCommentsDialog(Array(notifications?.length).fill(false));
	}, [notifications]);

	return (
		<TableDialogContainer
			state={state}
			setState={setState}
			index={index}
			fullScreen
			title={`Notificações - ${inspection.name}`}
		>
			<Button
				variant="contained"
				color="primary"
				onClick={() =>
					openDialog(sendNotificationDialog, setSendNotificationDialog, index)
				}
				sx={{
					alignSelf: "flex-end",
					mr: 1,
					mb: 3,
				}}
				endIcon={<Add />}
			>
				Nova Notificação
			</Button>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Título</TableCell>
						<TableCell>Data</TableCell>
						<TableCell>Chat</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{hasNotifications ? (
						notifications.map((notification, pos) => (
							<TableRow key={notification.id}>
								<TableCell>{notification.title}</TableCell>
								<TableCell>
									{convertEphocDate(notification.timestamp)}
								</TableCell>
								<TableCell>
									<Tooltip title="Abrir Chat">
										<IconButton
											color="info"
											onClick={() =>
												openDialog(commentsDialog, setCommentsDialog, pos)
											}
										>
											<Chat />
										</IconButton>
									</Tooltip>
								</TableCell>
								{/* <Button
									sx={{
										mt: 2,
										borderRadius: "50px",
										width: "90%",
										alignSelf: "center",
									}}
									onClick={() =>
										openDialog(commentsDialog, setCommentsDialog, pos)
									}
									variant="contained"
								>
									{notification.title} -{" "}
									{convertEphocDate(notification.timestamp)}
								</Button> */}
								<OpenMessagesDialog
									state={commentsDialog}
									setState={setCommentsDialog}
									index={pos}
									notification={notification}
								/>
							</TableRow>
						))
					) : (
						<WarningField
							severity="warning"
							title="Ausência de dados"
							message="Não há nenhuma notificação para esta vistoria"
						/>
					)}
					<SendNotificationDialog
						state={sendNotificationDialog}
						setState={setSendNotificationDialog}
						index={index}
						inspection={inspection}
					/>
				</TableBody>
			</Table>
			<TablePagination
				rowsPerPage={rowsPerPage}
				setRowsPerPage={setRowsPerPage}
				page={page}
				setPage={setPage}
				data={notifications!}
			/>
		</TableDialogContainer>
	);
}
