import { toast, ToastOptions } from "react-toastify";

type ToastPosition =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

type ToastType = "info" | "success" | "warning" | "error" | "default";

export function Notify(
	text: string,
	position: ToastPosition = "bottom-left",
	type: ToastType,
	customConfig?: ToastOptions
) {
	const DEFAULT_CONFIG: ToastOptions = {
		position: position,
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark",
	};

	const config = customConfig ? customConfig : DEFAULT_CONFIG;

	if (type === "info") {
		return toast.info(text, config);
	}
	if (type === "success") {
		return toast.success(text, config);
	}
	if (type === "warning") {
		return toast.warning(text, config);
	}
	if (type === "error") {
		return toast.error(text, config);
	}

	return toast(text, config);
}
