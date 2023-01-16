import {
	Box,
	Button,
	CircularProgress,
	Container,
	Grid,
	Step,
	StepButton,
	Stepper,
} from "@mui/material";
import React, { useState } from "react";
import { Photo } from "../../../core/models/Photo";
import { PublicWork } from "../../../core/models/PublicWork";
import { useGetQueueCollectsByPublicWorkId } from "../../../core/network/queries/collect/queries";
import {
	useAcceptCollect,
	useDeletePhoto,
	useRefuseCollect,
} from "../../../core/network/queries/queue/mutations";
import { closeDialog } from "../../../utils/dialogHandler";
import { PublicWorkMapView } from "../PublicWorkMapView";
import { QueueCollects } from "./QueueCollects";
import { QueueConfirm } from "./QueueConfirm";
import { QueuePhotos } from "./QueuePhotos";

interface QueueStepperProps {
	publicWork: PublicWork;
	state: boolean[];
	setState(state: boolean[]): void;
	index: number;
}

export function QueueStepper({
	publicWork,
	state,
	setState,
	index,
}: QueueStepperProps) {
	const [activeStep, setActiveStep] = useState(0);
	const [completed] = useState<{
		[k: number]: boolean;
	}>({});
	const [acceptedPhotos, setAcceptedPhotos] = useState<Photo[]>([]);
	const [rejectedPhotos, setRejectedPhotos] = useState<Photo[]>([]);

	const handleNext = () => setActiveStep((prevStep) => prevStep + 1);

	const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

	const handleStepChange = (step: number) => setActiveStep(step);

	const steps = ["Obra Pública", "Envios", "Fotos", "Confirmar"];

	const { data: collectsOfPublicWork } = useGetQueueCollectsByPublicWorkId(
		publicWork.id
	);

	const { mutate: accept, isLoading: loadingAccept } = useAcceptCollect();

	const { mutate: refuse, isLoading: loadingRefuse } = useRefuseCollect();

	const { mutate: deletePhoto } = useDeletePhoto();

	const handleRefuseCollect = () => {
		rejectedPhotos.forEach((photo) => deletePhoto(photo.id));

		collectsOfPublicWork?.forEach((collect) => {
			refuse({
				...collect,
				queue_status: 2,
				photos: acceptedPhotos,
				queue_status_date: Date.now(),
			});
			closeDialog(state, setState, index);
		});
	};

	const handleAcceptCollects = () => {
		rejectedPhotos.forEach((photo) => deletePhoto(photo.id));

		collectsOfPublicWork?.forEach((collect) =>
			accept({
				...collect,
				queue_status: 1,
				photos: acceptedPhotos,
				queue_status_date: Date.now(),
			})
		);
		closeDialog(state, setState, index);
	};

	return (
		<Container style={{ width: "100%", height: "100%" }}>
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

			<Grid sx={{ pt: 2 }} container>
				{activeStep === 0 && <PublicWorkMapView publicWork={publicWork} />}
				{activeStep === 1 && (
					<QueueCollects
						workStatusFlag={publicWork.user_status}
						publicWorkId={publicWork.id}
					/>
				)}
				{activeStep === 2 && collectsOfPublicWork && (
					<QueuePhotos
						rejectedPhotos={rejectedPhotos}
						setRejectedPhotos={setRejectedPhotos}
						acceptedPhotos={acceptedPhotos}
						setAcceptedPhotos={setAcceptedPhotos}
						collectsOfPublicWork={collectsOfPublicWork}
					/>
				)}
				{activeStep === 3 && <QueueConfirm />}
			</Grid>
			<Box
				justifyContent="flex-end"
				display="flex"
				flexDirection="row"
				sx={{ pt: 2 }}
			>
				<Button
					disabled={activeStep === 0}
					variant="contained"
					color="info"
					onClick={handleBack}
					sx={{ mr: 1 }}
				>
					Anterior
				</Button>
				{activeStep === 3 && (
					<Button
						onClick={handleRefuseCollect}
						variant="contained"
						color="error"
						sx={{ mr: 1 }}
					>
						{loadingRefuse ? <CircularProgress size={25} /> : "Recusar"}
					</Button>
				)}
				<Button
					variant="contained"
					color={activeStep === 3 ? "success" : "info"}
					onClick={activeStep === 3 ? handleAcceptCollects : handleNext}
					sx={{ mr: 1 }}
				>
					{activeStep === 3 && loadingAccept && <CircularProgress size={25} />}
					{activeStep === 3 && !loadingAccept && "Confirmar"}
					{activeStep !== 3 && "Próximo"}
				</Button>
			</Box>
		</Container>
	);
}
