import { Rtt } from "@mui/icons-material";
import {
	Autocomplete,
	Button,
	CircularProgress,
	Grid,
	TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { OpenCallDTO } from "../../../core/models/dto/OpenCallDTO";
import { CallServiceQuery } from "../../../core/network/services/CallService";
import { useUserStore } from "../../../core/store/user";
import { InfoTextField } from "../../Inputs/InfoTextField";
import { Notify } from "../../Toast/Notify";
import { SingleDialogContainer } from "../DialogContainer";

interface OpenCallDialogProps {
	state: boolean;
	setState: (state: boolean) => void;
}

export function OpenCallDialog({ state, setState }: OpenCallDialogProps) {
	const { user, allUsers } = useUserStore();
	const queryClient = useQueryClient();

	const { mutate: openCall, isLoading } = useMutation(
		CallServiceQuery.openCall
	);

	const [call, setCall] = useState<OpenCallDTO>({
		admin_email: user.email,
		title: "",
		user_email: "",
	});

	const options = allUsers?.filter((user) => user.email !== user.email);

	const handleOpenCall = () => {
		openCall(call, {
			onSuccess: () => {
				queryClient.invalidateQueries(["getUserCalls", user.email]);
				Notify(
					"Chamado aberto! Você pode acessá-lo em Chamados/Meus Chamados!",
					"bottom-left",
					"success"
				);
				setCall({
					admin_email: user.email,
					title: "",
					user_email: "",
				});
				setState(false);
			},
			onError: () => {
				Notify(
					"Preencha todas informações necessárias!",
					"bottom-left",
					"error"
				);
			},
		});
	};

	return (
		<>
			{allUsers && options && (
				<SingleDialogContainer
					title="Novo Chamado"
					state={state}
					setState={setState}
				>
					<Grid container spacing={2}>
						<InfoTextField
							sx={{ m: 2 }}
							onChange={(e) => setCall({ ...call, title: e.target.value })}
							label="Tíulo"
							icon={<Rtt />}
							fullWidth
						/>
						<Autocomplete
							sx={{ m: 2 }}
							disablePortal
							fullWidth
							renderInput={(params) => (
								<TextField {...params} label="Abrir chamado para" />
							)}
							options={options}
							getOptionLabel={(option) =>
								option.full_name + " - " + option.email
							}
							defaultValue={null}
							onChange={(e, value) => {
								value
									? setCall({ ...call, user_email: value.email })
									: setCall({ ...call, user_email: "" });
							}}
						/>
					</Grid>
					<Button
						variant="contained"
						disabled={
							isLoading ||
							call.user_email === null ||
							call.user_email === "" ||
							call.title === ""
						}
						onClick={handleOpenCall}
						color="success"
						sx={{ mr: 2 }}
					>
						{isLoading ? <CircularProgress size={20} /> : "Confirmar"}
					</Button>
				</SingleDialogContainer>
			)}
		</>
	);
}
