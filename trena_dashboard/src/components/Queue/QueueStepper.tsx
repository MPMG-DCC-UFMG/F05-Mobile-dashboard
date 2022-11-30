import {
  Box,
  Button,
  Container,
  Grid,
  Step,
  StepButton,
  Stepper,
} from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Collect } from "../../core/models/Collect";
import { PublicWork } from "../../core/models/PublicWork";
import { CollectServiceQuery } from "../../core/network/services/CollectService";
import { PublicWorkMapView } from "./PublicWorkMapView";
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
        <Button
          variant="contained"
          color={activeStep === 3 ? "success" : "primary"}
          onClick={handleNext}
          sx={{ mr: 1 }}
        >
          {activeStep === 3 ? "Confirmar" : "Próximo"}
        </Button>
      </Box>
    </Container>
  );
}
