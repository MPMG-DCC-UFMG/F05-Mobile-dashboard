import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";

interface DatePickerProps {
	value: number;
	setValue: (value: number) => void;
	label: string;
}

export function DatePicker({ value, setValue, label }: DatePickerProps) {
	const handleChangeValue = (value: Date | null) => {
		if (!value) {
			setValue(Date.now());
			return;
		}

		setValue(value.getTime());
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<MuiDatePicker
				inputFormat="dd/MM/yyyy"
				label={label}
				value={new Date(value)}
				onChange={handleChangeValue}
				renderInput={(params) => <TextField {...params} />}
			/>
		</LocalizationProvider>
	);
}
