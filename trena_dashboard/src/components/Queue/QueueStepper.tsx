import { Close } from "@material-ui/icons";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Step,
  StepButton,
  Stepper,
} from "@mui/material";
import React, { useState } from "react";
import { QueuePublicWork } from "./PublicWorkMapView";
import { QueueCollects } from "./QueueCollects";
import { QueueConfirm } from "./QueueConfirm";
import { QueuePhotos } from "./QueuePhotos";

interface QueueStepperProps {
  setClose(state: boolean): void;
  close: boolean;
}

export function QueueStepper({ setClose, close }: QueueStepperProps) {
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

  const steps = ["Obra Pública", "Coletas", "Fotos", "Confirmar"];

  return (
    <Container style={{ width: "100%", height: "100%" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Paper sx={{ width: "100%", p: 4 }}>
          <Grid display="flex" justifyContent="flex-end" item sx={{ mb: 2 }}>
            <IconButton onClick={() => setClose(!close)}>
              <Close />
            </IconButton>
          </Grid>
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
            {activeStep === 0 && <QueuePublicWork />}
            {activeStep === 1 && <QueueCollects />}
            {activeStep === 2 && <QueuePhotos />}
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
        </Paper>
      </Grid>
    </Container>
  );
}

