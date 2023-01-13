export function areFieldsChecked(fields: never[]) {
	const check = fields.map(
		(field) => field !== "" && field !== null && field !== undefined
	);

	if (check.includes(false)) return false;

	return true;
}
