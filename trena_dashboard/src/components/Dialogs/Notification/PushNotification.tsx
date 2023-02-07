import { Rtt, TextFields } from "@mui/icons-material";
import { Button, CircularProgress, Grid } from "@mui/material";
import React, { useState } from "react";
import { PushMessageDTO } from "../../../core/models/dto/notification/PushMessageDTO";
import { useGetUserPublicData } from "../../../core/network/queries/auth/queries";
import { useSendPushNotification } from "../../../core/network/queries/notification/mutations";
import { InfoTextField } from "../../Inputs/InfoTextField";
import { TableDialogContainer } from "../DialogContainer";

interface PushNotificationProps {
	state: boolean[];
	setState: (state: boolean[]) => void;
	index: number;
	userEmail: string;
}

export function PushNotificationDialog({
	state,
	setState,
	index,
	userEmail,
}: PushNotificationProps) {
	const { data: user } = useGetUserPublicData(userEmail);
	const [notification, setNotification] = useState<PushMessageDTO>({
		body: "",
		sound: "default",
		title: "",
		to: user ? user.expo_token : "",
	});

	const { mutate: send, isLoading } = useSendPushNotification();

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
							setNotification({ ...notification, body: e.target.value })
						}
						label="Aviso"
						icon={<TextFields />}
						fullWidth
						multiline
						required
					/>
				</Grid>
				<Button
					variant="contained"
					disabled={
						isLoading || notification.title === "" || notification.body === ""
					}
					onClick={() => send(notification)}
					color="success"
					sx={{ mr: 2 }}
				>
					{isLoading ? <CircularProgress size={20} /> : "Confirmar"}
				</Button>
			</TableDialogContainer>
		</>
	);
}
