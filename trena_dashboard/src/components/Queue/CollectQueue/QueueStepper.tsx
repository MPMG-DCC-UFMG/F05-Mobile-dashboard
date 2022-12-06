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
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Collect } from "../../../core/models/Collect";
import { PublicWork } from "../../../core/models/PublicWork";
import { CollectServiceQuery } from "../../../core/network/services/CollectService";
import { Notify } from "../../Toast/Notify";
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
  const queryClient = useQueryClient();
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

  const { mutate: acceptCollect, isLoading: loadingAccept } = useMutation(
    CollectServiceQuery.updateCollect
  );
  const { mutate: refuseCollect, isLoading: loadingRefuse } = useMutation(
    CollectServiceQuery.updateCollect
  );

  const handleRefuseCollect = () => {
    collectsOfPublicWork?.forEach((collect) => {
      refuseCollect(
        {
          ...collect,
          queue_status: 2,
          photos: [],
          inspection_flag: "",
          queue_status_date: Date.now(),
        },
        {
          onSuccess: () => {
            Notify(
              "Vistoria Cidadã recusada com sucesso!",
              "bottom-left",
              "success"
            );
            queryClient.invalidateQueries("queueCollects");
            setState(state.map((s, pos) => (pos === index ? false : s)));
          },
          onError: () => {
            Notify(
              "Erro ao recusar Vistoria Cidadã. Verifique o Servidor",
              "bottom-left",
              "success"
            );
            setState(state.map((s, pos) => (pos === index ? false : s)));
          },
        }
      );
    });
  };

  const handleAcceptCollects = () => {
    collectsOfPublicWork?.forEach((collect) =>
      acceptCollect(
        {
          ...collect,
          queue_status: 1,
          photos: [],
          inspection_flag: "",
          queue_status_date: Date.now(),
        },
        {
          onSuccess: () => {
            Notify(
              "Vistoria Cidadã aprovada com sucesso!",
              "bottom-left",
              "success"
            );
            setState(state.map((s, pos) => (pos === index ? false : s)));
            queryClient.invalidateQueries("queueCollects");
          },
          onError: () => {
            Notify(
              "Erro ao aceitar Vistoria Cidadã. Verifique o Servidor",
              "bottom-left",
              "error"
            );
            setState(state.map((s, pos) => (pos === index ? false : s)));
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
