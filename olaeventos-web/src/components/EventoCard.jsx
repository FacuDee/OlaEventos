import React from "react";

function EventoCard({ evento }) {
  const fechaFormateada = new Date(evento.fecha).toLocaleString("es-AR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="col d-flex">
      <div
        className="card h-100 shadow-sm bg-dark text-white w-100"
        style={{ backgroundColor: "#222", color: "#eee" }}
      >
        <img
          src={evento.imagenUrl}
          alt={evento.titulo}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title" style={{ color: "#ff9900" }}>
            {evento.titulo}
          </h5>
          <p className="card-text mb-1">
            <strong>Fecha:</strong> {fechaFormateada}
          </p>
          <p className="card-text mb-1">
            <strong>Lugar:</strong> {evento.lugar?.nombre}
          </p>
          <p className="card-text mb-3">
            <strong>Tipo:</strong> {evento.tipoEvento?.nombre}
          </p>

          <div className="mt-auto">
            <a
              href={evento.linkEntrada}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary w-100"
            >
              COMPRÁ TU ENTRADA
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventoCard;
