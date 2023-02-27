export function openDialog(
	state: boolean[],
	setState: (newState: boolean[]) => void,
	index: number
) {
	setState(state.map((value, pos) => (index === pos ? true : value)));
}

export function closeDialog(
	state: boolean[],
	setState: (newState: boolean[]) => void,
	index: number
) {
	setState(state.map((value, pos) => (index === pos ? false : value)));
}
