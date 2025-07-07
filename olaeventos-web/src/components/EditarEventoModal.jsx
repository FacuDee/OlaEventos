// src/components/EditarEventoModal.jsx

import React, { useEffect, useState } from 'react';

function EditarEventoModal({ evento, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...evento });
  const [lugares, setLugares] = useState([]);
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/lugares')
      .then(res => res.json())
      .then(setLugares);
    fetch('http://localhost:3000/tipo-evento')
      .then(res => res.json())
      .then(setTipos);
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/eventos/${evento.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          lugarId: parseInt(formData.lugarId),
          tipoEventoId: parseInt(formData.tipoEventoId)
        }),
      });

      if (!res.ok) throw new Error('Error al editar evento');
      const actualizado = await res.json();
      onSave(actualizado);
    } catch (err) {
      console.error(err);
      alert('No se pudo editar el evento.');
    }
  };

  return (
    <div className="modal d-block bg-dark bg-opacity-75" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h5 className="modal-title">Editar Evento</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Título</label>
                <input
                  type="text"
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
                  name="linkEntrada"
                  value={formData.linkEntrada}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Lugar</label>
                <select
                  className="form-select"
                  name="lugarId"
                  value={formData.lugarId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar lugar</option>
                  {lugares.map(l => (
                    <option key={l.id} value={l.id}>
                      {l.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Tipo de evento</label>
                <select
                  className="form-select"
                  name="tipoEventoId"
                  value={formData.tipoEventoId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar tipo</option>
                  {tipos.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-success">
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditarEventoModal;
