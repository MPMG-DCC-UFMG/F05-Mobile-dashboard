import { Send } from "@mui/icons-material";
import {
	CircularProgress,
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
import { TableDialogContainer } from "../DialogContainer";

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
		id: uuid(),
		content: "",
		notification_id: notification.id,
		receive_email: notification.user_email,
		send_email: user.email,
		timestamp: Date.now(),
	});

	const { data: comments, isLoading } = useGetCommentsFromNotification(
		notification.id
	);

	const { mutate: send, isLoading: sending } = useSendComment();

	const handleSendMessage = () => {
		send(message);
		setMessage({ ...message, content: "" });
	};

	return (
		<TableDialogContainer
			index={index}
			state={state}
			setState={setState}
			title={notification.title}
			scroll="paper"
		>
			{comments &&
				!isLoading &&
				comments.map((comment) => (
					<ChatCard
						key={comment.id}
						messageOwner={comment.send_email}
						side={comment.send_email === user.email ? "right" : "left"}
						text={message.content}
						timestamp={comment.timestamp}
					/>
				))}

			{open && (
				<TextField
					label="Escreva sua mensagem"
					value={message.content}
					sx={{ mt: 2 }}
					onChange={(e) => setMessage({ ...message, content: e.target.value })}
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
		</TableDialogContainer>
	);
}
