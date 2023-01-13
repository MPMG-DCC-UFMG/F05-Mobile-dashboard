import { Close } from "@mui/icons-material";
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	Grid,
	IconButton,
	Typography,
	useTheme,
} from "@mui/material";
import React from "react";

interface ConfirmActionDialogProps {
  message: string;
  action: () => void;
  state: boolean | boolean[];
  setState(state: boolean | boolean[]): void;
  index?: number;
}

export function ConfirmActionDialog({
	message,
	action,
	state,
	setState,
	index,
}: ConfirmActionDialogProps) {
	const theme = useTheme();

	const handleCloseModal = () => {
		typeof state === "boolean"
			? setState(state)
			: setState(state.map((s, pos) => (pos === index ? false : s)));
	};

	return (
		<Dialog
			TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}
			open={typeof state === "boolean" ? state : state[index!]}
			scroll="body"
			fullWidth
		>
			<DialogTitle color={theme.palette.grey[400]}>
				<Grid container justifyContent="space-between" alignItems="center">
					<Grid item>Confirmar ação</Grid>
					<Grid item>
						<IconButton sx={{ size: "small" }} onClick={() => setState(false)}>
							<Close />
						</IconButton>
					</Grid>
				</Grid>
			</DialogTitle>
			<Divider />
			<DialogContent>
				<Grid container justifyContent="space-between" alignItems="center">
					<Grid container flexDirection="column" item sx={{ pt: 2 }}>
						<Typography>{message}</Typography>
						<Grid sx={{ mt: 2 }} item display="flex" justifyContent="flex-end">
							<Button variant="contained" color="success" onClick={action}>
                Salvar
							</Button>
							<Button
								onClick={handleCloseModal}
								variant="contained"
								color="error"
							>
                Cancelar
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	);
}
