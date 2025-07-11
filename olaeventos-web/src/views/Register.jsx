import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, nombre }),
      });
      if (!res.ok) throw new Error("No se pudo registrar el usuario");
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      navigate("/login");
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
        <h2 className="title-login mb-4 text-center">Registrar Usuario</h2>
        <form
          onSubmit={handleRegister}
          style={{
            borderRadius: "1rem",
            padding: "2rem",
            width: "100%",
          }}
        >
          <div className="mb-3">
            <label>Nombre</label>
            <input
              type="text"
              className="form-control mt-2"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
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
            />
          </div>
          <button className="btn-login btn btn-danger w-100">Registrarse</button>
          <div className="text-center mt-3">
            <span>¿Ya tienes cuenta? </span>
            <Link to="/login" className="text-warning ">
              Inicia sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;