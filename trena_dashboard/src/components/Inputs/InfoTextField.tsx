import { InputAdornment, TextField } from "@mui/material";
import React from "react";

interface InfoTextFieldProps {
	label: string;
	icon?: JSX.Element;
	fullWidth?: boolean;
	disabled?: boolean;
	defaultValue?: string | Date;
	value?: string | Date;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string;
	multiline?: boolean;
	sx?: object;
	required?: boolean;
}

export function InfoTextField({
	label,
	icon,
	fullWidth,
	disabled,
	defaultValue,
	value,
	onChange,
	type,
	multiline,
	sx,
	required,
}: InfoTextFieldProps) {
	return (
		<TextField
			margin="normal"
			sx={sx}
			required={required ? required : false}
			fullWidth={fullWidth}
			label={label}
			disabled={disabled}
			defaultValue={defaultValue}
			value={value}
			type={type}
			onChange={onChange}
			multiline={multiline}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">{icon}</InputAdornment>
				),
			}}
		/>
	);
}
