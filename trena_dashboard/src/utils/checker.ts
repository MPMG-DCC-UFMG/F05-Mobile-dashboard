export function areFieldsChecked(fields: any[]) {
  const check = fields.map(
    (field) => field !== "" && field !== null && field !== undefined
  );

  if (check.includes(false)) return false;

  return true;
}
