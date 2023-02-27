import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useOAuth } from "../core/network/queries/auth/queries";

export function OAuthScreen() {
	const { isLoading } = useOAuth();

	return (
		<>
			<div>
				<Backdrop
					open={isLoading}
					sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			</div>
		</>
	);
}
