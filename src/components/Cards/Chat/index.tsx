import { Avatar, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useGetUserPublicData } from "../../../core/network/queries/auth/queries";
import { convertEphocDate } from "../../../utils/mapper";

interface ChatCardProps {
	messageOwner: string;
	text: string;
	timestamp: number;
	side: "left" | "right";
}

export function ChatCard({
	messageOwner,
	text,
	timestamp,
	side,
}: ChatCardProps) {
	const { data: ownerMetadata } = useGetUserPublicData(messageOwner);

	const backgroundColorBasedOnUser = side === "right" ? "blue" : "#F5F5F5";
	const textColorBasedOnUser = side === "right" ? "white" : "blue";

	return (
		<>
			<Grid
				container
				spacing={2}
				justifyContent={side === "right" ? "flex-end" : "flex-start"}
			>
				{side === "left" && (
					<Grid sx={{ mt: 2 }} item>
						<Avatar src={ownerMetadata?.picture} />
					</Grid>
				)}
				<Grid width="50%" height="50%" item sx={{ mt: 2 }}>
					<Paper
						sx={{
							background: backgroundColorBasedOnUser,
						}}
						elevation={3}
					>
						<Typography align={side} color={textColorBasedOnUser}>
							{side === "left" ? ownerMetadata?.full_name + ": " + text : text}
						</Typography>
						{convertEphocDate(timestamp)}
					</Paper>
				</Grid>
			</Grid>
		</>
	);
}
