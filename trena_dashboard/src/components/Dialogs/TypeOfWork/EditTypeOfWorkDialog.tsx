import {
	Button,
	Checkbox,
	CircularProgress,
	Grid,
	Step,
	StepButton,
	Stepper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
import React, { useState } from "react";
import { UpdateTypeWorkDTO } from "../../../core/models/dto/typeWork/UpdateTypeWorkDTO";
import { TypeWork } from "../../../core/models/TypeWork";
import { useLoadTypePhotos } from "../../../core/network/queries/typePhotos/queries";
import {
	useUpdateTypeWork,
	useUpdateTypeWorkPhotos,
	useUpdateTypeWorkStatus,
} from "../../../core/network/queries/typeWork/mutations";
import { useLoadWorkStatus } from "../../../core/network/queries/workStatus/queries";
import { UpdateParams } from "../../../core/network/services/TypeWorkService";
import { TableDialogContainer } from "../DialogContainer";

interface EditTypeOfWorkDialog {
	state: boolean[];
	setState(state: boolean[]): void;
	typeWork: TypeWork;
	index: number;
	title: string;
}

export function EditTypeOfWorkDialog({
	state,
	setState,
	typeWork,
	index,
	title,
}: EditTypeOfWorkDialog) {
	const { data: typePhotos } = useLoadTypePhotos();
	const { data: workStatus } = useLoadWorkStatus();
	const { mutate: updateTypeWork, isLoading } = useUpdateTypeWork();
	const { mutate: updateTypeWorkPhotos } = useUpdateTypeWorkPhotos();
	const { mutate: updateTypeWorkStatus } = useUpdateTypeWorkStatus();

	const [typeWorkName, setTypeWorkName] = useState<string>(typeWork.name);
	const [photoFlags, setPhotoFlags] = useState<number[]>([]);
	const [workStatusFlags, setWorkStatusFlags] = useState<number[]>([]);
	const [completed, setCompleted] = useState<{
		[k: number]: boolean;
	}>({});
	const [activeStep, setActiveStep] = useState(0);
	const steps = ["Tipo de Obra", "Tipo de Foto", "Estado da Obra"];

	const handleStepChange = (step: number) => setActiveStep(step);

	const handleCloseDialog = () => {
		setState(state.map((value) => (value === true ? false : value)));
		setActiveStep(0);
		setTypeWorkName(typeWork.name);
		setPhotoFlags([]);
		setWorkStatusFlags([]);
	};

	const handleUpdateTypeWork = () => {
		updateTypeWork(
			{ flag: typeWork.flag, name: typeWorkName, status_list: [] } as UpdateTypeWorkDTO,
			{
				onSuccess(data) {
					if (photoFlags.length !== 0) {
						updateTypeWorkPhotos({
							updateFlags: photoFlags,
							typeWorkFlag: data.flag!,
						} as UpdateParams);
					}
					if (workStatusFlags.length !== 0) {
						updateTypeWorkStatus({
							updateFlags: workStatusFlags,
							typeWorkFlag: data.flag!,
						} as UpdateParams);
					}
				},
			}
		);
	};

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	const handlePhotoCheck = (flag: number, value: string) => {
		if (value === "on") {
			setPhotoFlags([...photoFlags, flag]);
		} else {
			setPhotoFlags(photoFlags.filter((value) => value !== flag));
		}
	};

	const handleWorkStatusCheck = (flag: number, value: string) => {
		if (value === "on") {
			setWorkStatusFlags([...workStatusFlags, flag]);
		} else {
			setWorkStatusFlags(workStatusFlags.filter((value) => value !== flag));
		}
	};

	return (
		<TableDialogContainer
			state={state}
			setState={setState}
			index={index}
			title={title}
		>
			<Grid item>
				<Stepper activeStep={activeStep}>
					{steps.map((label, index) => (
						<Step key={label} completed={completed[index]}>
							<StepButton onClick={() => handleStepChange(index)}>
								{label}
							</StepButton>
						</Step>
					))}
				</Stepper>
			</Grid>
			{activeStep === 0 && (
				<Grid item sx={{ pt: 3 }}>
					<TextField
						onChange={(e) => setTypeWorkName(e.target.value)}
						defaultValue={typeWorkName}
						required
						label="Tipo de Obra"
						fullWidth
					/>
				</Grid>
			)}
			{activeStep === 1 && (
				<Grid item sx={{ pt: 3 }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Check</TableCell>
								<TableCell>Tipo de Foto</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{typePhotos?.map((value) => (
								<TableRow key={value.flag}>
									<TableCell>
										<Checkbox
											onChange={(e) =>
												handlePhotoCheck(value.flag, e.target.value)
											}
										/>
									</TableCell>
									<TableCell>{value.name}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Grid>
			)}
			{activeStep === 2 && (
				<Grid item sx={{ pt: 3 }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Check</TableCell>
								<TableCell>Estado da Obra</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{workStatus?.map((value, index) => (
								<TableRow key={value.flag}>
									<TableCell>
										<Checkbox
											onChange={(e) =>
												handleWorkStatusCheck(value.flag, e.target.value)
											}
										/>
									</TableCell>
									<TableCell>{value.name}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Grid>
			)}
			<Grid
				container
				spacing={2}
				sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
			>
				<Grid item display="flex">
					<Button onClick={handleCloseDialog} color="error" variant="contained">
						Cancelar
					</Button>
				</Grid>
				{activeStep > 0 && (
					<Grid item display="flex">
						<Button onClick={handleBack} color="info" variant="contained">
							Anterior
						</Button>
					</Grid>
				)}
				{activeStep < 2 && (
					<Grid item display="flex">
						<Button onClick={handleNext} color="info" variant="contained">
							Proximo
						</Button>
					</Grid>
				)}
				{activeStep === 2 && (
					<Grid item display="flex">
						<Button
							onClick={() => handleUpdateTypeWork()}
							color="success"
							variant="contained"
						>
							{isLoading ? <CircularProgress /> : "Salvar"}
						</Button>
					</Grid>
				)}
			</Grid>
		</TableDialogContainer>
	);
}
