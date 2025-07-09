import React, { useEffect, useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

function FormularioEvento({ onEventoCreado }) {
  const [lugares, setLugares] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [formData, setFormData] = useState({
    titulo: "",
    fecha: "",
    imagenUrl: "",
    linkEntrada: "",
    lugarId: "",
    tipoEventoId: "",
  });

  const [mostrarExito, setMostrarExito] = useState(false);
  const [nuevoEventoGuardado, setNuevoEventoGuardado] = useState(null);

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
      .then((tipos) => {
        const ordenados = [...tipos].sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );
        setTipos(ordenados);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataEnviar = {
      ...formData,
      lugarId: parseInt(formData.lugarId),
      tipoEventoId: parseInt(formData.tipoEventoId),
    };

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/eventos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataEnviar),
      });

      if (!res.ok) throw new Error("Error al crear evento");

      const nuevoEvento = await res.json();

      // Guardamos para mostrar mensaje primero
      setNuevoEventoGuardado(nuevoEvento);
      setMostrarExito(true);
    } catch (err) {
      console.error(err);
      alert("Hubo un error al cargar el evento.");
    }
  };

  const handleConfirmarExito = () => {
    onEventoCreado(nuevoEventoGuardado);
    setMostrarExito(false);
    // Limpiar formulario después de confirmar
    setFormData({
      titulo: "",
      fecha: "",
      imagenUrl: "",
      linkEntrada: "",
      lugarId: "",
      tipoEventoId: "",
    });
  };

  return (
    <>
      <form
        className="p-4 rounded shadow mb-5"
        style={{
          backgroundColor: "#1e1e1e",
          color: "white",
          border: "1px solid #444",
        }}
        onSubmit={handleSubmit}
      >
        <h4 className="mb-3 text-light">
          <img
            src="./../public/event_icon.png"
            alt="Icono evento"
            style={{
              width: "30px",
              height: "30px",
              marginRight: "8px",
              verticalAlign: "middle",
              filter: "brightness(0) invert(1)" /* Negro → Blanco */,
            }}
          />
          Cargar nuevo evento
        </h4>

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
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Imagen (URL)</label>
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
            {lugares.map((lugar) => (
              <option key={lugar.id} value={lugar.id}>
                {lugar.nombre}
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
            {tipos.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-warning w-100">
          CREAR EVENTO
        </button>
      </form>

      {mostrarExito && (
        <ConfirmDialog
          mensaje="¡Evento creado correctamente!"
          onConfirmar={handleConfirmarExito}
          onCancelar={() => setMostrarExito(false)}
        />
      )}
    </>
  );
}

export default FormularioEvento;
