import { Avatar, Dialog, DialogContent } from "@mui/material";
import React, { useState } from "react";
import { PublicWork } from "../../core/models/PublicWork";
import { useGetMediaByFilepath } from "../../core/network/queries/collect/queries";

interface PublicWorkPhotoProps {
	publicWork: PublicWork;
}

export function PublicWorkPhoto({ publicWork }: PublicWorkPhotoProps) {
	const filePath = publicWork.profile_picture.slice(7);

	const { data: photo } = useGetMediaByFilepath(filePath);

	return <Avatar src={`data:;base64,${photo}`} />;
}
