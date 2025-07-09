import React from "react";

function LugarCard({ lugar }) {
  return (
    <div className="card bg-dark text-white w-100 h-100">
  <div className="ratio ratio-16x9">
    <img
      src={`http://localhost:3000/lugar-images/${lugar.imagenUrl}`}
      alt={lugar.nombre}
      className="img-fluid object-fit-cover rounded-top"
    />
  </div>
  <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
    <h5 className="card-title m-3">{lugar.nombre}</h5>
    <p className="text-warning medium mb-3">
  <i className="bi bi-geo-alt-fill me-1"></i> {lugar.direccion}
</p>
    <button className="btn btn-danger px-4 m-3">Conocer</button>
  </div>
</div>

  );
}

export default LugarCard;
