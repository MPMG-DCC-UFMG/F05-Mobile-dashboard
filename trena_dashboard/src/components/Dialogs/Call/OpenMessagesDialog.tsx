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
import { ChatCard } from "../../Cards/Chat";
import { TableDialogContainer } from "../DialogContainer";

interface OpenMessagesDialogProps {
  state: boolean[];
  setState(state: boolean[]): void;
  index: number;
  call: Call;
}

export function OpenMessagesDialog({
  state,
  setState,
  index,
  call,
}: OpenMessagesDialogProps) {
  const [message, setMessage] = useState<SendMessageDTO>({
    call_id: call.id,
    receiver_email: call.user_email,
    sender_email: call.admin_email,
    text: "",
  });

  const queryClient = useQueryClient();

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
    >
      {messages &&
        !isLoading &&
        messages.map((message) => (
          <ChatCard
            key={message.id}
            messageOwner={message.sender_email}
            side={message.sender_email === call.admin_email ? "right" : "left"}
            text={message.text}
            timestamp={message.timestamp}
          />
        ))}

      <TextField
        label="Escreva sua mensagem"
        value={message.text}
        onChange={(e) => setMessage({ ...message, text: e.target.value })}
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
    </TableDialogContainer>
  );
}
