import React, { useEffect, useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

function EditarLugarModal({ lugar, onClose, onSave }) {
  const [formData, setFormData] = useState({
    ...lugar,
    redSocial: lugar.redSocial ?? "",
  });

  const [mostrarExito, setMostrarExito] = useState(false);
  const [mostrarExpiracion, setMostrarExpiracion] = useState(false);

  // 🔁 Sincronizar formData con lugar cada vez que se actualice
  useEffect(() => {
    setFormData({
      ...lugar,
      redSocial: lugar.redSocial ?? "",
    });
  }, [lugar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/lugares/${lugar.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 401) {
        setMostrarExpiracion(true);
        return;
      }

      if (!res.ok) throw new Error("Error al editar lugar");

      const actualizado = await res.json();
      setFormData(actualizado);
      setMostrarExito(true);
    } catch (err) {
      console.error(err);
      alert("No se pudo editar el lugar.");
    }
  };

  return (
    <>
      <div
        className="modal d-block"
        tabIndex="-1"
        style={{
          background: "rgba(255, 153, 0, 0.15)",
          minHeight: "100vh",
          padding: "40px 0",
          zIndex: 1050,
        }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title">Editar Lugar</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div
                className="modal-body"
                style={{ background: "#23272b", borderRadius: "0.5rem" }}
              >
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Dirección</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Tipo</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Imagen (ruta o URL)</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    name="imagenUrl"
                    value={formData.imagenUrl ?? ""}
                    onChange={handleChange}
                    required
                  />
                  <small className="text-secondary">
                    Ej: <code>lugar-images/miLugar.jpg</code> o una URL completa
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Link Red Social</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    name="redSocial"
                    value={formData.redSocial}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div
                className="modal-footer"
                style={{ background: "#23272b", borderTop: "1px solid #444" }}
              >
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-warning">
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {mostrarExito && (
        <ConfirmDialog
          mensaje="¡Lugar editado correctamente!"
          onConfirmar={() => {
            onSave(formData);
            setMostrarExito(false);
            onClose();
          }}
          onCancelar={() => setMostrarExito(false)}
        />
      )}

      {mostrarExpiracion && (
        <ConfirmDialog
          mensaje="Tu sesión ha expirado. Por favor, volvé a iniciar sesión."
          soloConfirmar={true}
          onConfirmar={() => {
            localStorage.removeItem("token");
            setMostrarExpiracion(false);
            window.location.href = "/login";
          }}
          onCancelar={() => setMostrarExpiracion(false)}
        />
      )}
    </>
  );
}

export default EditarLugarModal;
