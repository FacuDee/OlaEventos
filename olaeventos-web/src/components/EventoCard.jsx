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
        style={{
          backgroundColor: "#222",
          color: "#eee",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px) scale(1.01)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(255, 153, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
        }}
      >
        {/* ✅ Etiqueta diagonal */}
        <div
          className="position-absolute text-white bg-danger fw-bold"
          style={{
            top: "10px",
            left: "10px",
            width: "80px",
            textAlign: "center",
            padding: "6px 0",
            borderRadius: "10px",
            fontSize: "0.9rem",
            zIndex: 2,
            boxShadow: "0 0 6px rgba(0,0,0,0.5)",
            opacity: 0.95,
          }}
        >
          {new Date(evento.fecha).getDate().toString().padStart(2, "0")}{" "}
          {new Date(evento.fecha)
            .toLocaleString("es-AR", {
              month: "short",
            })
            .toUpperCase()}
        </div>

        <img
          src={evento.imagenUrl}
          alt={evento.titulo}
          className="card-img-top evento-img"
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
