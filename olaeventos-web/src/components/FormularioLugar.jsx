// src/components/FormularioLugar.jsx

import React, { useState } from "react";

function FormularioLugar({ onLugarCreado }) {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    tipo: "",
    imagenUrl: "",
    redSocial: "",
  });
  const [mensajeExito, setMensajeExito] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/lugares", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al crear lugar");
      const nuevoLugar = await res.json();
      onLugarCreado(nuevoLugar);
      setMensajeExito("¡Lugar creado correctamente!");
      setFormData({
        nombre: "",
        direccion: "",
        tipo: "",
        imagenUrl: "",
        redSocial: "",
      });
    } catch (error) {
      console.error("Error al crear lugar:", error);
      alert("No se pudo crear el lugar.");
    }
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
            alt="Icono lugar"
            style={{
              width: "30px",
              height: "30px",
              marginRight: "8px",
              verticalAlign: "middle",
              filter: "brightness(0) invert(1)",
            }}
          />
          Cargar nuevo lugar
        </h4>

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
            value={formData.imagenUrl}
            onChange={handleChange}
            placeholder="Ej: lugar-images/club.jpg o https://..."
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Link Red Social (opcional)</label>
          <input
            type="text"
            className="form-control bg-dark text-white border-secondary"
            name="redSocial"
            value={formData.redSocial}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <button type="submit" className="btn btn-warning w-100">
          CREAR LUGAR
        </button>
      </form>

      {mensajeExito && (
        <div className="alert alert-success py-2">{mensajeExito}</div>
      )}
    </>
  );
}

export default FormularioLugar;
