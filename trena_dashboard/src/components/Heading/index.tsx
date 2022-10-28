import { Add, NavigateNext } from "@mui/icons-material";
import {
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export type BreadCrumbSteps = {
  title: string;
  url: string;
};

interface HeadingProps {
  title: string;
  steps: BreadCrumbSteps[];
  buttonTitle: string;
  handleAction(): void;
  children: React.ReactNode;
}

export function Heading({
  title,
  steps,
  buttonTitle,
  handleAction,
  children,
}: HeadingProps) {
  const navigate = useNavigate();

  const handleLinkBreadcrumbs = (step: BreadCrumbSteps) => {
    step.url === "/"
      ? navigate(`/dashboard`)
      : navigate(`/dashboard/${step.url}`);
  };

  return (
    <>
      <Container style={{ width: "100%", height: "100%" }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid sx={{ pl: "40px", pt: "20px", pb: "20px" }} item>
            <Typography
              fontSize="1.5rem"
              style={{ color: "#0288d1" }}
              variant="h3"
            >
              {title}
            </Typography>
            <Breadcrumbs separator={<NavigateNext />}>
              {steps.map((step, index) => (
                <Link
                  sx={{ cursor: "pointer" }}
                  aria-current
                  color="inherit"
                  key={index}
                  underline="hover"
                  onClick={() => handleLinkBreadcrumbs(step)}
                >
                  {step.title}
                </Link>
              ))}
            </Breadcrumbs>
          </Grid>
          <Grid item sx={{ pl: "40px", pt: "40px", pb: "20px" }}>
            <Button
              onClick={handleAction}
              color="info"
              startIcon={<Add />}
              variant="contained"
            >
              {buttonTitle}
            </Button>
          </Grid>
        </Grid>
        <Divider />
        <Grid
          sx={{ pt: "20px" }}
          spacing={6}
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid
            item
            style={{ width: "100%", height: "100%" }}
            sx={{ pl: "24px", pt: "24px" }}
          >
            {children}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
