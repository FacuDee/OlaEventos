import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Credenciales incorrectas");

      const data = await res.json();
      login(data.token); // Actualiza el contexto y localStorage
      navigate("/admin");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#181818",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="container text-white"
        style={{
          background: "#23272b",
          padding: "2.5rem 2rem",
          borderRadius: "1rem",
          boxShadow: "0 0 24px #0008",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2 className="title-login mb-4 text-center">Iniciar Sesión</h2>
        <form
          onSubmit={handleLogin}
          style={{
            borderRadius: "1rem",
            padding: "2rem",
            width: "100%",
          }}
        >
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label>Contraseña</label>
            <input
              type="password"
              className="form-control mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button className="btn-login btn btn-danger w-100">Ingresar</button>
          <div className="text-center text-secondary mt-3">
            <span>¿No tienes cuenta? </span>
            <Link to="/register" className="text-light ">
              Regístrate
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
