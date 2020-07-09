import React from "react";

interface DeleteViewProps {
    toDelete: string
}

export const DeleteView: React.FC<DeleteViewProps> = (props) => {
    return (
        <div>
            Deseja deletar <b>{props.toDelete}</b>?
        </div>
    )
}