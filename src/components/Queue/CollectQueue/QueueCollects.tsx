import {
	Grid,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@mui/material";
import React from "react";
import { useGetQueueCollectsByPublicWorkId } from "../../../core/network/queries/collect/queries";
import { useWorkStatusStore } from "../../../core/store/workStatus";
import { convertEphocDate } from "../../../utils/mapper";

interface QueueColectsProps {
	workStatusFlag: number;
	publicWorkId: string;
}

export function QueueCollects({
	publicWorkId,
	workStatusFlag,
}: QueueColectsProps) {
	const { data: collects } = useGetQueueCollectsByPublicWorkId(publicWorkId);
	const { workStatus } = useWorkStatusStore();

	return (
		<>
			{collects && workStatus && (
				<Grid style={{ width: "100%", marginTop: 14 }} item>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell align="center">Usuário Responsável</TableCell>
								<TableCell align="center">Data de Captura</TableCell>
								<TableCell align="center">Data de Envio</TableCell>
								<TableCell align="center">Estado da Obra</TableCell>
								<TableCell align="center">Comentário</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{collects.map((collect) => (
								<React.Fragment key={collect.id}>
									<TableCell align="center">{collect.user_email}</TableCell>
									<TableCell align="center">
										{convertEphocDate(collect.date)}
									</TableCell>
									<TableCell align="center">
										{convertEphocDate(collect.queue_status_date)}
									</TableCell>
									<TableCell align="center">
										{
											workStatus.find(
												(status) => status.flag === workStatusFlag
											)?.name
										}
									</TableCell>
									<TableCell align="center">
										{collect.comments ? collect.comments : "Não há comentários"}
									</TableCell>
								</React.Fragment>
							))}
						</TableBody>
					</Table>
				</Grid>
			)}
		</>
	);
}
