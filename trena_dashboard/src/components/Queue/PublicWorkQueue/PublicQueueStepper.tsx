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
import { useMutation } from "react-query";
import { PublicWork } from "../../../core/models/PublicWork";
import { PublicWorkServiceQuery } from "../../../core/network/services/PublicWorkService";
import { PublicWorkMapView } from "../PublicWorkMapView";
import { ConfirmPublicWork } from "./ConfirmPublicWork";
import { PublicQueueType } from "./PublicQueueType";

interface PublicQueueStepperProps {
  publicWork: PublicWork;
}

export function PublicQueueStepper({ publicWork }: PublicQueueStepperProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);

  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleStepChange = (step: number) => setActiveStep(step);

  const steps = ["Endereço", "Tipo", "Confirmar"];

  const { mutate: accept, isLoading: loadingAccept } = useMutation(
    PublicWorkServiceQuery.updatePublicWork
  );
  const { mutate: refuse, isLoading: loadingRefuse } = useMutation(
    PublicWorkServiceQuery.updatePublicWork
  );

  const handleAcceptPublicWork = () => {
    accept(
      { ...publicWork, queue_status: 1, queue_status_date: Date.now() },
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
    );
  };

  const handleRefusePublicWork = () => {
    refuse({ ...publicWork, queue_status: 2, queue_status_date: Date.now() });
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
        {activeStep === 1 && <PublicQueueType publicWork={publicWork} />}
        {activeStep === 2 && <ConfirmPublicWork />}
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
        {activeStep === 2 && (
          <Button
            onClick={handleRefusePublicWork}
            variant="contained"
            color="error"
            sx={{ mr: 1 }}
          >
            {loadingRefuse ? <CircularProgress /> : "Recusar"}
          </Button>
        )}
        <Button
          variant="contained"
          color={activeStep === 2 ? "success" : "primary"}
          onClick={activeStep === 2 ? handleAcceptPublicWork : handleNext}
          sx={{ mr: 1 }}
        >
          {activeStep === 2 && loadingAccept && <CircularProgress />}
          {activeStep === 2 && !loadingAccept && "Confirmar"}
          {activeStep !== 2 && "Próximo"}
        </Button>
      </Box>
    </Container>
  );
}
