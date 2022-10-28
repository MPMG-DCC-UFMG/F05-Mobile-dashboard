import { TableDialogProps } from "../DialogContainer";

interface HandlePublicWorkDialogProps extends TableDialogProps {
  mode: "edit" | "delete";
}

export function HandlePublicWorkDialog({
  state,
  setState,
  title,
  index,
  mode,
}: HandlePublicWorkDialogProps) {}
