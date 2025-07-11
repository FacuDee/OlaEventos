import React, { useState } from "react";
import FormularioLugar from "./FormularioLugar";
import EditarLugarModal from "./EditarLugarModal";
import ConfirmDialog from "./ConfirmDialog";

function LugaresAdminSection({ lugares, setLugares }) {
  const [mostrarFormularioLugar, setMostrarFormularioLugar] = useState(false);
  const [busquedaLugar, setBusquedaLugar] = useState("");
  const [lugarAEditar, setLugarAEditar] = useState(null);
  const [lugarAEliminar, setLugarAEliminar] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);

  const lugaresFiltrados = lugares.filter(
    (lugar) =>
      lugar.nombre.toLowerCase().includes(busquedaLugar.toLowerCase()) ||
      lugar.tipo.toLowerCase().includes(busquedaLugar.toLowerCase())
  );

  const lugaresPorPagina = 10;
  const totalPaginas = Math.ceil(lugaresFiltrados.length / lugaresPorPagina);
  const lugaresVisibles = lugaresFiltrados.slice(
    (paginaActual - 1) * lugaresPorPagina,
    paginaActual * lugaresPorPagina
  );

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  const handleLugarCreado = (nuevoLugar) => {
    setLugares((prev) => [nuevoLugar, ...prev]);
    setMostrarFormularioLugar(false);
    setPaginaActual(1);
  };

  const handleGuardarLugarEditado = (lugarActualizado) => {
    setLugares((prev) =>
      prev.map((l) => (l.id === lugarActualizado.id ? lugarActualizado : l))
    );
    setLugarAEditar(null);
  };

  const eliminarLugar = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:3000/lugares/${lugarAEliminar.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLugares((prev) => prev.filter((l) => l.id !== lugarAEliminar.id));
      setLugarAEliminar(null);
    } catch (error) {
      console.error("Error eliminando lugar:", error);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4 mt-5">
        <h2 className="text-secondary mb-0">Administrar Lugares</h2>
        <button
          className="btn btn-outline-light"
          onClick={() => setMostrarFormularioLugar(!mostrarFormularioLugar)}
        >
          {mostrarFormularioLugar ? "✖️ Cancelar" : "➕ Nuevo Lugar"}
        </button>
      </div>

      <div
        style={{
          maxHeight: mostrarFormularioLugar ? "1000px" : "0",
          overflow: "hidden",
          transition: "max-height 0.5s ease",
        }}
      >
        {mostrarFormularioLugar && (
          <FormularioLugar onLugarCreado={handleLugarCreado} />
        )}
      </div>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Buscar por nombre o tipo..."
          className="form-control"
          value={busquedaLugar}
          onChange={(e) => {
            setBusquedaLugar(e.target.value);
            setPaginaActual(1);
          }}
          style={{ maxWidth: "400px" }}
        />
      </div>

      {/* Tabla para pantallas medianas y grandes */}
      <div className="table-responsive d-none d-md-block">
        <table className="table table-dark table-striped table-hover">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lugaresVisibles.map((lugar) => (
              <tr key={lugar.id}>
                <td>{lugar.nombre}</td>
                <td>{lugar.direccion}</td>
                <td>{lugar.tipo}</td>
                <td>
                  <button
                    className="btn btn-sm btn-secondary me-2"
                    onClick={() => setLugarAEditar(lugar)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => setLugarAEliminar(lugar)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista móvil */}
      <div className="d-md-none">
        {lugaresVisibles.map((lugar) => (
          <div
            key={lugar.id}
            className="bg-dark text-white border rounded p-3 mb-3 shadow-sm"
          >
            <p>
              <strong>Nombre:</strong> {lugar.nombre}
            </p>
            <p>
              <strong>Dirección:</strong> {lugar.direccion}
            </p>
            <p>
              <strong>Tipo:</strong> {lugar.tipo}
            </p>
            <div className="mt-2">
              <button
                className="btn btn-sm btn-secondary me-2"
                onClick={() => setLugarAEditar(lugar)}
              >
                Editar
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => setLugarAEliminar(lugar)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de paginación */}
      {totalPaginas > 1 && (
        <div className="d-flex justify-content-center mt-3 gap-2">
          <button
            className="btn btn-sm btn-outline-light"
            disabled={paginaActual === 1}
            onClick={() => cambiarPagina(paginaActual - 1)}
          >
            ◀ Anterior
          </button>
          {[...Array(totalPaginas)].map((_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${
                i + 1 === paginaActual ? "btn-warning" : "btn-outline-light"
              }`}
              onClick={() => cambiarPagina(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="btn btn-sm btn-outline-light"
            disabled={paginaActual === totalPaginas}
            onClick={() => cambiarPagina(paginaActual + 1)}
          >
            Siguiente ▶
          </button>
        </div>
      )}

      {lugarAEditar && (
        <EditarLugarModal
          lugar={lugarAEditar}
          onClose={() => setLugarAEditar(null)}
          onSave={handleGuardarLugarEditado}
        />
      )}

      {lugarAEliminar && (
        <ConfirmDialog
          mensaje={`¿Estás seguro que querés eliminar "${lugarAEliminar.nombre}"?`}
          onConfirmar={eliminarLugar}
          onCancelar={() => setLugarAEliminar(null)}
        />
      )}
    </>
  );
}

export default LugaresAdminSection;
