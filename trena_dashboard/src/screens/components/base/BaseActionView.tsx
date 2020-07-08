import React from "react";

export interface BaseActionView {
    title: string,
    confirmButton: string,
    onConfirmClick: () => void,
    contentView: React.FC
}