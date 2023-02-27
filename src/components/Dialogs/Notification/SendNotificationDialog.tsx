import { Rtt, TextFields } from "@mui/icons-material";
import {
	Button,
	Checkbox,
	CircularProgress,
	FormControlLabel,
	FormGroup,
	Grid,
} from "@mui/material";
import React, { useState } from "react";
import uuid from "react-uuid";
import { CreateNotificationDTO } from "../../../core/models/dto/notification/CreateNotificationDTO";
import { Inspection } from "../../../core/models/Inspection";
import { useGetUserPublicData } from "../../../core/network/queries/auth/queries";
import {
	useSendComment,
	useSendNotification,
	useSendPushNotification,
} from "../../../core/network/queries/notification/mutations";
import { useUserStore } from "../../../core/store/user";
import { closeDialog } from "../../../utils/dialogHandler";
import { InfoTextField } from "../../Inputs/InfoTextField";
import { TableDialogContainer } from "../DialogContainer";

interface SendNotificationDialogProps {
	state: boolean[];
	setState(state: boolean[]): void;
	index: number;
	inspection: Inspection;
}

export function SendNotificationDialog({
	state,
	setState,
	index,
	inspection,
}: SendNotificationDialogProps) {
	const { user } = useUserStore();
	const { data: inspector } = useGetUserPublicData(inspection.user_email);
	const { mutate: send, isLoading } = useSendNotification();
	const { mutate: push } = useSendPushNotification();
	const { mutate: sendComment } = useSendComment();

	const [notification, setNotification] = useState<CreateNotificationDTO>({
		id: "",
		timestamp: 0,
		title: "",
		answer: false,
		user_email: inspection.user_email,
		content: "",
		inspection_id: inspection.flag,
	});

	const handleSendNotification = () => {
		send(
			{ ...notification, id: uuid(), timestamp: Date.now() },
			{
				onSuccess: (data) => {
					sendComment({
						id: uuid(),
						timestamp: Date.now(),
						content: notification.content,
						send_email: user.email,
						notification_id: data.id,
						receive_email: inspection.user_email,
					});
				},
			}
		);
		push({
			title: notification.title,
			body: notification.content,
			to: inspector ? inspector.expo_token : "",
			sound: "default",
		});

		closeDialog(state, setState, index);
		setNotification({ ...notification, title: "", content: "" });
	};

	return (
		<>
			<TableDialogContainer
				title="Notificar"
				state={state}
				setState={setState}
				index={index}
			>
				<Grid container spacing={2}>
					<InfoTextField
						sx={{ m: 2 }}
						onChange={(e) =>
							setNotification({ ...notification, title: e.target.value })
						}
						label="Tíulo"
						icon={<Rtt />}
						fullWidth
						required
					/>
					<InfoTextField
						sx={{ m: 2 }}
						onChange={(e) =>
							setNotification({ ...notification, content: e.target.value })
						}
						label="Aviso"
						icon={<TextFields />}
						fullWidth
						multiline
						required
					/>
					<FormGroup sx={{ ml: 2, mb: 2 }}>
						<FormControlLabel
							control={
								<Checkbox
									inputProps={{ "aria-label": "controlled" }}
									onChange={(e) =>
										setNotification({
											...notification,
											answer: e.target.checked,
										})
									}
									checked={notification.answer}
								/>
							}
							label={"Habilitar resposta"}
						/>
					</FormGroup>
				</Grid>
				<Button
					variant="contained"
					disabled={
						isLoading ||
						notification.title === "" ||
						notification.content === ""
					}
					onClick={handleSendNotification}
					color="success"
					sx={{ mr: 2 }}
				>
					{isLoading ? <CircularProgress size={20} /> : "Confirmar"}
				</Button>
			</TableDialogContainer>
		</>
	);
}
