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

	const backgroundColorBasedOnUser = side === "right" ? "#0288d1" : "#36454F";
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
							p: 1,
						}}
						elevation={3}
					>
						<Grid
							display="flex"
							alignContent="center"
							justifyContent="space-between"
						>
							<Typography align={"left"} color={textColorBasedOnUser}>
								{side === "left"
									? ownerMetadata?.full_name + ": " + text
									: text}
							</Typography>
						</Grid>
						<Grid>
							<Typography align={"right"} color={textColorBasedOnUser}>
								{convertEphocDate(timestamp)}
							</Typography>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</>
	);
}
