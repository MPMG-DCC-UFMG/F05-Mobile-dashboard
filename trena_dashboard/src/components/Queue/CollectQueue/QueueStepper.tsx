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
import { useMutation, useQuery } from "react-query";
import { Collect } from "../../../core/models/Collect";
import { PublicWork } from "../../../core/models/PublicWork";
import { CollectServiceQuery } from "../../../core/network/services/CollectService";
import { WarningField } from "../../WarningField";
import { PublicWorkMapView } from "../PublicWorkMapView";
import { QueueCollects } from "./QueueCollects";
import { QueueConfirm } from "./QueueConfirm";
import { QueuePhotos } from "./QueuePhotos";

interface QueueStepperProps {
  publicWork: PublicWork;
}

export function QueueStepper({ publicWork }: QueueStepperProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);

  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleStepChange = (step: number) => setActiveStep(step);

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const steps = ["Obra Pública", "Envios", "Fotos", "Confirmar"];

  const { data: collectsOfPublicWork } = useQuery<Collect[]>(
    ["getCitizenCollectsOfPublicWork"],
    () => CollectServiceQuery.getQueueCollectsByPublicWorkId(publicWork.id)
  );

  const { mutate: acceptCollect, isLoading: loadingAccept } = useMutation(
    CollectServiceQuery.updateCollect
  );
  const { mutate: refuseCollect, isLoading: loadingRefuse } = useMutation(
    CollectServiceQuery.updateCollect
  );

  const handleRefuseCollect = () => {
    collectsOfPublicWork?.map((collect) =>
      refuseCollect(
        { ...collect, queue_status: 2 },
        {
          onSuccess: () => {
            setSuccess(true);
            setError(false);
          },
          onError: () => {
            setError(true);
            setSuccess(false);
          },
        }
      )
    );
  };

  const handleAcceptCollects = () => {
    collectsOfPublicWork?.map((collect) =>
      acceptCollect(
        { ...collect, queue_status: 1 },
        {
          onSuccess: () => {
            setSuccess(true);
            setError(false);
          },
          onError: () => {
            setError(true);
            setSuccess(false);
          },
        }
      )
    );
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
            workStatusFlag={publicWork.user_status!}
            publicWorkId={publicWork.id}
          />
        )}
        {activeStep === 2 && collectsOfPublicWork && (
          <QueuePhotos collectsOfPublicWork={collectsOfPublicWork} />
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
          color="primary"
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
            {loadingRefuse ? <CircularProgress /> : "Recusar"}
          </Button>
        )}
        <Button
          variant="contained"
          color={activeStep === 3 ? "success" : "primary"}
          onClick={activeStep === 3 ? handleAcceptCollects : handleNext}
          sx={{ mr: 1 }}
          disabled={success}
        >
          {activeStep === 3 && loadingAccept && <CircularProgress />}
          {activeStep === 3 && !loadingAccept && "Confirmar"}
          {activeStep !== 3 && "Próximo"}
        </Button>
        {success && (
          <WarningField
            title="Obra Avaliada com sucesso!"
            severity="success"
            message={`A Obra ${publicWork.name} foi avaliada com sucesso!`}
          />
        )}
      </Box>
    </Container>
  );
}
