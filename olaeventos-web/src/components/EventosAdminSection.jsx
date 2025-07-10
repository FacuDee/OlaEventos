import React, { useState } from "react";
import FormularioEvento from "./FormularioEvento";
import EditarEventoModal from "./EditarEventoModal";
import ConfirmDialog from "./ConfirmDialog";

function EventosAdminSection({ eventos, setEventos }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [eventoAEliminar, setEventoAEliminar] = useState(null);
  const [mostrarExito, setMostrarExito] = useState(false);

  const eventosFiltrados = eventos.filter(
    (evento) =>
      evento.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      evento.lugar.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleEventoCreado = (nuevoEvento) => {
    setEventos((prev) => [nuevoEvento, ...prev]);
    setMostrarFormulario(false);
    setMostrarExito(true);
  };

  const handleGuardarCambios = (eventoActualizado) => {
    setEventos((prev) =>
      prev.map((e) => (e.id === eventoActualizado.id ? eventoActualizado : e))
    );
    setEventoSeleccionado(null);
  };

  const eliminarEvento = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:3000/eventos/${eventoAEliminar.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEventos((prev) => prev.filter((e) => e.id !== eventoAEliminar.id));
      setEventoAEliminar(null);
    } catch (error) {
      console.error("Error eliminando evento:", error);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="text-secondary mb-0">Administrar Eventos</h2>
        <button
          className="btn btn-outline-light"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? "✖️ Cancelar" : "➕ Nuevo Evento"}
        </button>
      </div>

      <div
        style={{
          maxHeight: mostrarFormulario ? "1000px" : "0",
          overflow: "hidden",
          transition: "max-height 0.5s ease",
        }}
      >
        {mostrarFormulario && (
          <FormularioEvento onEventoCreado={handleEventoCreado} />
        )}
      </div>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Buscar por título o lugar..."
          className="form-control"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ maxWidth: "400px" }}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-striped table-hover">
          <thead>
            <tr>
              <th>Título</th>
              <th>Fecha</th>
              <th>Lugar</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {eventosFiltrados.map((evento) => (
              <tr key={evento.id}>
                <td>{evento.titulo}</td>
                <td>
                  {new Date(evento.fecha).toLocaleString("es-AR", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td>{evento.lugar.nombre}</td>
                <td>{evento.tipoEvento.nombre}</td>
                <td>
                  <button
                    className="btn btn-sm btn-secondary me-2"
                    onClick={() => setEventoSeleccionado(evento)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => setEventoAEliminar(evento)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {eventoSeleccionado && (
        <EditarEventoModal
          evento={eventoSeleccionado}
          onClose={() => setEventoSeleccionado(null)}
          onSave={handleGuardarCambios}
        />
      )}

      {eventoAEliminar && (
        <ConfirmDialog
          mensaje={`¿Estás seguro que querés eliminar "${eventoAEliminar.titulo}"?`}
          onConfirmar={eliminarEvento}
          onCancelar={() => setEventoAEliminar(null)}
        />
      )}

      {mostrarExito && (
        <ConfirmDialog
          mensaje="¡Evento creado correctamente!"
          onConfirmar={() => setMostrarExito(false)}
        />
      )}
    </>
  );
}

export default EventosAdminSection;
