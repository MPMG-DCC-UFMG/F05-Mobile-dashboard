import { Close, Send } from "@mui/icons-material";
import {
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
} from "@mui/material";
import React, { useState } from "react";
import uuid from "react-uuid";
import { CreateCommentDTO } from "../../../core/models/dto/comment/CreateCommentDTO";
import { Notification } from "../../../core/models/Notification";
import { useSendComment } from "../../../core/network/queries/notification/mutations";
import { useGetCommentsFromNotification } from "../../../core/network/queries/notification/queries";
import { useUserStore } from "../../../core/store/user";
import { ChatCard } from "../../Cards/Chat";

interface OpenMessagesDialogProps {
	state: boolean[];
	setState(state: boolean[]): void;
	index: number;
	open?: boolean;
	notification: Notification;
}

export function OpenMessagesDialog({
	state,
	setState,
	index,
	open = true,
	notification,
}: OpenMessagesDialogProps) {
	const user = useUserStore((state) => state.user);
	// const messageReceiver =
	// 	notification.user_email === messageSender ? user.email : user.email;

	const [message, setMessage] = useState<CreateCommentDTO>({
		id: "",
		content: "",
		notification_id: notification.id,
		receive_email: notification.user_email,
		send_email: user.email,
		timestamp: Date.now(),
	});

	const {
		data: comments,
		isLoading,
		refetch,
	} = useGetCommentsFromNotification(notification.id);

	const { mutate: send, isLoading: sending } = useSendComment();

	const handleSendMessage = () => {
		send(
			{ ...message, id: uuid() },
			{
				onSuccess: () => {
					refetch();
					setMessage({ ...message, content: "" });
				},
			}
		);
	};

	const handleCloseDialog = (index: number) =>
		setState(state.map((s, pos) => (pos === index ? false : s)));

	return (
		<Dialog
			TransitionProps={{ unmountOnExit: true, mountOnEnter: false }}
			open={state[index]}
			scroll="paper"
			fullWidth
			onClose={handleCloseDialog}
		>
			<DialogTitle>
				<Grid container justifyContent="space-between" alignItems="center">
					<Grid item>{notification.title}</Grid>
					<Grid item>
						<IconButton
							sx={{ size: "small" }}
							onClick={() => handleCloseDialog(index)}
						>
							<Close />
						</IconButton>
					</Grid>
				</Grid>
			</DialogTitle>
			<Divider />
			<DialogContent>
				<Grid container justifyContent="space-between" alignItems="center">
					<Grid container flexDirection="column" item sx={{ pt: 2 }}>
						{comments &&
							!isLoading &&
							comments.map((comment) => (
								<ChatCard
									key={comment.id}
									messageOwner={comment.send_email}
									side={comment.send_email === user.email ? "right" : "left"}
									text={comment.content}
									timestamp={comment.timestamp}
								/>
							))}
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				{open && (
					<TextField
						fullWidth
						label="Escreva sua mensagem"
						value={message.content}
						sx={{ mt: 2 }}
						onChange={(e) =>
							setMessage({ ...message, content: e.target.value })
						}
						multiline
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton disabled={sending} onClick={handleSendMessage}>
										{sending ? <CircularProgress /> : <Send color="info" />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				)}
			</DialogActions>
		</Dialog>
	);
}
