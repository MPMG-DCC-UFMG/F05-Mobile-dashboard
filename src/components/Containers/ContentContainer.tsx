import { Container, Grid } from "@mui/material";
import React from "react";

interface DashboardContentContainerProps {
  children: JSX.Element | JSX.Element[];
}

export function DashboardContentContainer({
	children,
}: DashboardContentContainerProps) {
	return (
		<Container
			style={{
				width: "100%",
				height: "100%",
			}}
		>
			<Grid
				sx={{ mt: "40px" }}
				container
				spacing={3}
				justifyContent="space-between"
				alignItems="center"
			>
				{children}
			</Grid>
		</Container>
	);
}
