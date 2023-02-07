import { Numbers, Rtt, TextFields, TextIncrease } from "@mui/icons-material";
import {
	Autocomplete,
	Button,
	CircularProgress,
	TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { CreateInspectionDTO } from "../../../core/models/dto/CreateInspectionDTO";
import { PublicUserDTO } from "../../../core/models/dto/user/PublicUserDTO";
import { PublicWork } from "../../../core/models/PublicWork";
import { useGetAllUsersPublicData } from "../../../core/network/queries/auth/queries";
import { useAddInspection } from "../../../core/network/queries/inspection/mutations";
import { closeDialog } from "../../../utils/dialogHandler";
import { DatePicker } from "../../DatePicker";
import { InfoTextField } from "../../Inputs/InfoTextField";
import { TableDialogContainer } from "../DialogContainer";

interface DelegateInspectionProps {
	state: boolean[];
	setState(state: boolean[]): void;
	index: number;
	publicWork: PublicWork;
}

export function DelegateInspectionDialog({
	state,
	setState,
	index,
	publicWork,
}: DelegateInspectionProps) {
	const queryClient = useQueryClient();
	const [datePicker, setDatePicker] = useState<number>(Date.now());

	const { data: users } = useGetAllUsersPublicData();
	const { mutate: addInspection, isLoading } = useAddInspection();

	const [inspection, setInspection] = useState<CreateInspectionDTO>({
		inquiry_number: null,
		name: "",
		user_email: "",
		public_work_id: publicWork.id,
		description: "",
		status: 0,
		request_date: Date.now(),
		limit_date: datePicker,
	});

	const handleAddInspection = () => {
		addInspection(
			{ ...inspection, request_date: Date.now() },
			{
				onSuccess: () => {
					setInspection({
						inquiry_number: null,
						name: "",
						user_email: "",
						public_work_id: publicWork.id,
						description: "",
						status: 0,
						request_date: Date.now(),
						limit_date: Date.now(),
					});
					queryClient.invalidateQueries("getMpInspections");
					queryClient.invalidateQueries([
						"getPublicWorkInspections",
						publicWork.id,
					]);
					closeDialog(state, setState, index);
				},
			}
		);
	};

	const visibilityOptions = ["Sigilosa", "Pública"];

	return (
		<TableDialogContainer
			state={state}
			setState={setState}
			title="Delegar Vistoria"
			index={index}
		>
			<InfoTextField
				label="Obra Pública"
				defaultValue={publicWork.name}
				disabled
				icon={<TextFields />}
			/>
			<InfoTextField
				label="Número de Inquérito"
				defaultValue={inspection.inquiry_number?.toString()}
				onChange={(e) =>
					setInspection({
						...inspection,
						inquiry_number: Number(e.target.value),
					})
				}
				icon={<Numbers />}
				type="number"
			/>
			<InfoTextField
				label="Nome da Vistoria"
				defaultValue={inspection.name}
				onChange={(e) => setInspection({ ...inspection, name: e.target.value })}
				icon={<TextIncrease />}
			/>
			<DatePicker
				label="Prazo de Vistoria"
				setValue={setDatePicker}
				value={datePicker}
			/>
			{users && (
				<Autocomplete
					sx={{ mt: 2 }}
					disablePortal
					fullWidth
					renderInput={(params) => (
						<TextField {...params} label="Email do Vistoriador responsável" />
					)}
					getOptionLabel={(option) => option.email}
					options={users ? users : ([{}] as PublicUserDTO[])}
					onChange={(e, value) => {
						value === null
							? setInspection({ ...inspection, user_email: "" })
							: setInspection({ ...inspection, user_email: value.email });
					}}
				/>
			)}
			<Autocomplete
				sx={{ mt: 2 }}
				disablePortal
				fullWidth
				renderInput={(params) => (
					<TextField {...params} label="Visibilidade da vistoria" />
				)}
				options={visibilityOptions}
				defaultValue={visibilityOptions[1]}
			/>
			<InfoTextField
				label="Descrição"
				defaultValue={inspection.description}
				onChange={(e) =>
					setInspection({ ...inspection, description: e.target.value })
				}
				icon={<Rtt />}
				multiline
			/>

			<Button
				disabled={isLoading}
				variant="contained"
				color="success"
				onClick={handleAddInspection}
			>
				{isLoading ? <CircularProgress /> : "Salvar"}
			</Button>
		</TableDialogContainer>
	);
}
