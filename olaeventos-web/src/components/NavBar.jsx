import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import ConfirmDialog from "./ConfirmDialog";
import Collapse from "bootstrap/js/dist/collapse";

function NavBar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mostrarConfirmacionLogout, setMostrarConfirmacionLogout] =
    useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLogoutConfirmado = () => {
    logout();
    setMostrarConfirmacionLogout(false);
    cerrarMenu();
    navigate("/");
  };

  useEffect(() => {
    // Inicializamos el collapse pero sin toggle automático
    const navCollapse = document.getElementById("navbarNav");
    if (navCollapse) {
      new Collapse(navCollapse, { toggle: false });
    }
  }, []);

  const toggleMenu = () => {
    const navbarCollapse = document.getElementById("navbarNav");
    if (!navbarCollapse) return;

    const collapse =
      Collapse.getInstance(navbarCollapse) ||
      new Collapse(navbarCollapse, { toggle: false });

    if (menuAbierto) {
      collapse.hide();
    } else {
      collapse.show();
    }
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    const navbarCollapse = document.getElementById("navbarNav");
    if (!navbarCollapse) return;

    const collapse =
      Collapse.getInstance(navbarCollapse) ||
      new Collapse(navbarCollapse, { toggle: false });
    collapse.hide();
    setMenuAbierto(false);
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg px-4 ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
        <Link
          className="navbar-brand text-danger fw-bold"
          to="/"
          onClick={cerrarMenu}
        >
          <span className="half-logo">
            <img
              src="/event_icon.png"
              alt=""
              style={{
                height: "1em",
                marginRight: "5px",
                filter: "brightness(0) invert(1)",
                verticalAlign: "middle",
              }}
            />
            Ola
          </span>
          Eventos
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={menuAbierto}
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {/* Theme Toggle Button */}
            <li className="nav-item me-2">
              <button
                className={`btn btn-sm ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
                onClick={toggleTheme}
                title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={cerrarMenu}>
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin" onClick={cerrarMenu}>
                    Administrar
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-sm btn-outline-warning m-2"
                    onClick={() => {
                      setMostrarConfirmacionLogout(true);
                      cerrarMenu();
                    }}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={cerrarMenu}>
                    Iniciar sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/register"
                    onClick={cerrarMenu}
                  >
                    Registrarse
                  </Link>
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
