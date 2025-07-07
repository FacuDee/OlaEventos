import React, { useEffect, useState } from "react";
import EditarEventoModal from "../components/EditarEventoModal";

function Admin() {
  const [eventos, setEventos] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarEventos();
  }, []);

  const cargarEventos = async () => {
    try {
      const res = await fetch("http://localhost:3000/eventos");
      const data = await res.json();
      setEventos(data);
    } catch (error) {
      console.error("Error cargando eventos:", error);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Estás seguro que querés eliminar este evento?"))
      return;
    try {
      await fetch(`http://localhost:3000/eventos/${id}`, { method: "DELETE" });
      setEventos((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error eliminando evento:", error);
    }
  };

  const handleEditarClick = (evento) => {
    setEventoSeleccionado(evento);
  };

  const handleCerrarModal = () => {
    setEventoSeleccionado(null);
  };

  const handleGuardarCambios = (eventoActualizado) => {
    setEventos((prev) =>
      prev.map((e) => (e.id === eventoActualizado.id ? eventoActualizado : e))
    );
    setEventoSeleccionado(null);
  };

  // Filtrar eventos por título o lugar
  const eventosFiltrados = eventos.filter(
    (evento) =>
      evento.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      evento.lugar.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div
      className="container-fluid bg-dark text-white min-vh-100 p-4"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <h2 className="mb-4 text-secondary">Administrar Eventos</h2>

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

      {eventosFiltrados.length === 0 ? (
        <p>No hay eventos para mostrar.</p>
      ) : (
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
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEditarClick(evento)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleEliminar(evento.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {eventoSeleccionado && (
        <EditarEventoModal
          evento={eventoSeleccionado}
          onClose={handleCerrarModal}
          onSave={handleGuardarCambios}
        />
      )}
    </div>
  );
}

export default Admin;
