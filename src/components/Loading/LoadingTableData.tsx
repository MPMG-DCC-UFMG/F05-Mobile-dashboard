import { Box, Grid, LinearProgress, Paper } from "@mui/material";
import React from "react";
import { BreadCrumbSteps, Heading } from "../Heading";

interface LoadingTableDataProps {
  headingButtonTitle?: string;
  headingTitle: string;
  headingSteps: BreadCrumbSteps[];
  headingAction?(): void;
}

export function LoadingTableData({
	headingButtonTitle,
	headingTitle,
	headingSteps,
	headingAction,
}: LoadingTableDataProps) {
	return (
		<Grid style={{ width: "100%", marginTop: 14 }} item xs={12}>
			<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
				<Heading
					buttonTitle={headingButtonTitle}
					title={headingTitle}
					steps={headingSteps}
					handleAction={headingAction}
				>
					<Box width="100%">
						<LinearProgress />
					</Box>
				</Heading>
			</Paper>
		</Grid>
	);
}
