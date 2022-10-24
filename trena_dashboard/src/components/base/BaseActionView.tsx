import { BaseCRUDView } from "./BaseCRUDView";

export interface BaseActionView<T, K> {
  title: string;
  confirmButton: string;
  onConfirmClick: () => void;
  contentView: BaseCRUDView<T, K>;
}
