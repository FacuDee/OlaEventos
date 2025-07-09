import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ConfirmDialog from './ConfirmDialog'; // Asegurate de tenerlo en la misma carpeta o ajustá la ruta

function NavBar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mostrarConfirmacionLogout, setMostrarConfirmacionLogout] = useState(false);

  const handleLogoutConfirmado = () => {
    logout();
    setMostrarConfirmacionLogout(false);
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <Link className="navbar-brand text-danger fw-bold" to="/">
          <span className="half-logo">
            <img 
              src="/event_icon.png" 
              alt=""
              style={{
                height: "1em",
                marginRight: "5px",
                filter: "brightness(0) invert(1)",
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
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Administrar</Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-sm btn-outline-warning m-2"
                    onClick={() => setMostrarConfirmacionLogout(true)}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Iniciar sesión</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Registrarse</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {mostrarConfirmacionLogout && (
        <ConfirmDialog
          mensaje="¿Estás seguro que querés cerrar sesión?"
          onConfirmar={handleLogoutConfirmado}
          onCancelar={() => setMostrarConfirmacionLogout(false)}
        />
      )}
    </>
  );
}

export default NavBar;