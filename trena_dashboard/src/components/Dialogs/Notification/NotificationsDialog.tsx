import { Add } from "@material-ui/icons";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Inspection } from "../../../core/models/Inspection";
import { useGetNotificationById } from "../../../core/network/queries/notification/queries";
import { useNotificationsStore } from "../../../core/store/notification";
import { openDialog } from "../../../utils/dialogHandler";
import { convertEphocDate } from "../../../utils/mapper";
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
			{hasNotifications ? (
				notifications.map((notification, pos) => (
					<React.Fragment key={notification.id}>
						<Button
							sx={{ mt: 2, borderRadius: "150px" }}
							onClick={() => openDialog(commentsDialog, setCommentsDialog, pos)}
							fullWidth
							variant="contained"
						>
							{notification.title} - {convertEphocDate(notification.timestamp)}
						</Button>
						<OpenMessagesDialog
							state={commentsDialog}
							setState={setCommentsDialog}
							index={pos}
							notification={notification}
						/>
					</React.Fragment>
				))
			) : (
				<WarningField
					severity="warning"
					title="Ausência de dados"
					message="Não há nenhuma notificação para esta vistoria"
				/>
			)}
			<Button
				variant="contained"
				color="success"
				onClick={() =>
					openDialog(sendNotificationDialog, setSendNotificationDialog, index)
				}
				sx={{
					borderRadius: "50px",
					alignSelf: "flex-end",
					mt: 2,
				}}
				endIcon={<Add />}
			>
				Nova Notificação
			</Button>
			<SendNotificationDialog
				state={sendNotificationDialog}
				setState={setSendNotificationDialog}
				index={index}
				inspection={inspection}
			/>
		</TableDialogContainer>
	);
}
