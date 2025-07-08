import React from "react";

function ConfirmDialog({ mensaje, onConfirmar, onCancelar }) {
  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      role="dialog"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
      >
        <div className="modal-content bg-dark text-white border border-warning">
          <div className="modal-header">
            <h5 className="modal-title text-warning">Mensaje:</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Cerrar"
              onClick={onCancelar}
            ></button>
          </div>
          <div className="modal-body">
            <p>{mensaje}</p>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={onCancelar}
            >
              Cancelar
            </button>
            <button
              className="btn btn-danger"
              onClick={onConfirmar}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
