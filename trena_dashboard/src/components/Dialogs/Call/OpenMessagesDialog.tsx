import { Send } from "@mui/icons-material";
import {
	CircularProgress,
	IconButton,
	InputAdornment,
	TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Call } from "../../../core/models/Call";
import { SendMessageDTO } from "../../../core/models/dto/SendMessageDTO";
import { MessageServiceQuery } from "../../../core/network/services/MessagesService";
import { useUserStore } from "../../../core/store/user";
import { ChatCard } from "../../Cards/Chat";
import { TableDialogContainer } from "../DialogContainer";

interface OpenMessagesDialogProps {
	state: boolean[];
	setState(state: boolean[]): void;
	index: number;
	open?: boolean;
	call: Call;
}

export function OpenMessagesDialog({
	state,
	setState,
	index,
	open = true,
	call,
}: OpenMessagesDialogProps) {
	const user = useUserStore((state) => state.user);
	const queryClient = useQueryClient();
	const messageSender = user.email;
	const messageReceiver =
		call.user_email === messageSender ? call.admin_email : call.user_email;

	const [message, setMessage] = useState<SendMessageDTO>({
		call_id: call.id,
		receiver_email: messageReceiver,
		sender_email: messageSender,
		text: "",
	});

	const {
		data: messages,
		isLoading,
		refetch,
	} = useQuery(["getCallMessages", call.id], () =>
		MessageServiceQuery.getMessagesFromCall(call.id)
	);

	const { mutate: sendMessage, isLoading: sending } = useMutation(
		MessageServiceQuery.sendMessage,
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries(["getCallMessages", call.id]);
			},
		}
	);

	const handleCloseDialog = () => {
		setState(state.map((s, pos) => (pos === index ? false : s)));
	};

	const handleSendMessage = () => {
		sendMessage(message);
		refetch();
		setMessage({ ...message, text: "" });
	};

	return (
		<TableDialogContainer
			index={index}
			state={state}
			setState={setState}
			title={call.title}
			scroll="paper"
		>
			{messages &&
				!isLoading &&
				messages.map((message) => (
					<ChatCard
						key={message.id}
						messageOwner={message.sender_email}
						side={message.sender_email === user.email ? "right" : "left"}
						text={message.text}
						timestamp={message.timestamp}
					/>
				))}

			{open && (
				<TextField
					label="Escreva sua mensagem"
					value={message.text}
					sx={{ mt: 2 }}
					onChange={(e) => setMessage({ ...message, text: e.target.value })}
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
