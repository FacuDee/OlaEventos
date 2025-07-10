// src/components/EditarEventoModal.jsx

import React, { useEffect, useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

function EditarEventoModal({ evento, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...evento });
  const [lugares, setLugares] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [mostrarExito, setMostrarExito] = useState(false);
  const [mostrarExpiracion, setMostrarExpiracion] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/lugares")
      .then((res) => res.json())
      .then((lugares) => {
        const ordenados = [...lugares].sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );
        setLugares(ordenados);
      });

    fetch("http://localhost:3000/tipo-evento")
      .then((res) => res.json())
      .then(setTipos);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/eventos/${evento.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          lugarId: parseInt(formData.lugarId),
          tipoEventoId: parseInt(formData.tipoEventoId),
          fecha: new Date(formData.fecha).toISOString(),
        }),
      });

      if (res.status === 401) {
        setMostrarExpiracion(true);
        return;
      }

      if (!res.ok) throw new Error("Error al editar evento");
      const actualizado = await res.json();
      // Guardá el evento actualizado en el estado local
      setFormData(actualizado);
      // Mostrá mensaje de éxito primero
      setMostrarExito(true);
    } catch (err) {
      console.error(err);
      alert("No se pudo editar el evento.");
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
              <h5 className="modal-title">Editar Evento</h5>
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
                  <label className="form-label">Título</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Fecha</label>
                  <input
                    type="datetime-local"
                    className="form-control bg-dark text-white border-secondary"
                    name="fecha"
                    value={formData.fecha.slice(0, 16)}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Imagen URL</label>
                  <input
                    type="url"
                    className="form-control bg-dark text-white border-secondary"
                    name="imagenUrl"
                    value={formData.imagenUrl}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Link entrada</label>
                  <input
                    type="url"
                    className="form-control bg-dark text-white border-secondary"
                    name="linkEntrada"
                    value={formData.linkEntrada}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Lugar</label>
                  <select
                    className="form-select bg-dark text-white border-secondary"
                    name="lugarId"
                    value={formData.lugarId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccionar lugar</option>
                    {lugares.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Tipo de evento</label>
                  <select
                    className="form-select bg-dark text-white border-secondary"
                    name="tipoEventoId"
                    value={formData.tipoEventoId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccionar tipo</option>
                    {tipos.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.nombre}
                      </option>
                    ))}
                  </select>
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
          mensaje="¡Evento editado correctamente!"
          onConfirmar={() => {
            onSave(formData); // recién ahora aplicás los cambios
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

export default EditarEventoModal;
