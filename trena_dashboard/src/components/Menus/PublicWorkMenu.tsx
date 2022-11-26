import React from "react";

interface PublicWorkMenuProps {
  collectCount: number;
  workStateUser: string;
  workStateIA: string;
  onDownloadClicked?: () => void;
}

export const PublicWorkMenu: React.FC<PublicWorkMenuProps> = (props) => {
  const { collectCount, workStateUser, workStateIA, onDownloadClicked } = props;

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p className="heading">Coletas</p>
          <p className="title">{collectCount}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p className="heading">Estado da Obra Usuário</p>
          <span className="tag is-info">{workStateUser}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p className="heading">Estado da Obra RNN</p>
          <span className="tag is-info">{workStateIA}</span>
        </div>
      </div>
      {onDownloadClicked && (
        <div className="level-item">
          <button className="button is-medium" onClick={onDownloadClicked}>
            <span className="icon"></span>
            <span>Baixar dados de coletas</span>
          </button>
        </div>
      )}
    </div>
  );
};

