import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand text-warning fw-bold" to="/">
  <span className="half-logo">
    <img 
      src="/event_icon.png" 
      alt=""
      style={{
        height: "1em",
        marginRight: "5px",
        filter: "brightness(0) invert(1)", // Convierte a blanco
        verticalAlign: "middle"
      }}
    />
    Ola
  </span>
  Eventos
</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin">Administrar eventos</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
