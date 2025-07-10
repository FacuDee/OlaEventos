import React, { useState } from "react";
import FormularioLugar from "./FormularioLugar";
import EditarLugarModal from "./EditarLugarModal";
import ConfirmDialog from "./ConfirmDialog";

function LugaresAdminSection({ lugares, setLugares }) {
  const [mostrarFormularioLugar, setMostrarFormularioLugar] = useState(false);
  const [busquedaLugar, setBusquedaLugar] = useState("");
  const [lugarAEditar, setLugarAEditar] = useState(null);
  const [lugarAEliminar, setLugarAEliminar] = useState(null);
  const [mostrarExito, setMostrarExito] = useState(false);

  const lugaresFiltrados = lugares.filter(
    (lugar) =>
      lugar.nombre.toLowerCase().includes(busquedaLugar.toLowerCase()) ||
      lugar.tipo.toLowerCase().includes(busquedaLugar.toLowerCase())
  );

  const handleLugarCreado = (nuevoLugar) => {
    setLugares((prev) => [nuevoLugar, ...prev]);
    setMostrarFormularioLugar(false);
    setMostrarExito(true);
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
      <div className="d-flex align-items-center justify-content-between mb-3 mt-5">
        <h3 className="text-secondary mb-0">Administrar Lugares</h3>
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
          onChange={(e) => setBusquedaLugar(e.target.value)}
          style={{ maxWidth: "400px" }}
        />
      </div>

      <div className="table-responsive">
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
            {lugaresFiltrados.map((lugar) => (
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

      {mostrarExito && (
        <ConfirmDialog
          mensaje="¡Lugar creado correctamente!"
          onConfirmar={() => setMostrarExito(false)}
        />
      )}
    </>
  );
}

export default LugaresAdminSection;
