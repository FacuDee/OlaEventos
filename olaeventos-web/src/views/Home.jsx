// ...existing imports...
import React, { useEffect, useState } from "react";
import EventoCard from "../components/EventoCard";
import LugarCard from "../components/LugarCard";
import PublicidadCarousel from "../components/PublicidadCarousel";

function Home() {
  const [eventos, setEventos] = useState([]);
  const [publicidades, setPublicidades] = useState([]);
  const [lugares, setLugares] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/eventos")
      .then((res) => res.json())
      .then(setEventos);

    fetch("http://localhost:3000/publicidades")
      .then((res) => res.json())
      .then(setPublicidades)
      .catch(() => setPublicidades([]));

    fetch("http://localhost:3000/lugares")
      .then((res) => res.json())
      .then(setLugares)
      .catch(() => setLugares([]));
  }, []);

  return (
    <div
      className="py-4"
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        fontFamily: "Montserrat, sans-serif",
        color: "white",
        paddingLeft: "2vw",
        paddingRight: "2vw",
      }}
    >
      {/* Carrusel de publicidades */}

      <PublicidadCarousel publicidades={publicidades} />

      <div className="d-flex justify-content-between flex-wrap align-items-center mb-4">
        <h1 className="text-secondary">Agenda Cultural de Olavarría</h1>
      </div>

      <div className="row">
        {eventos.length === 0 ? (
          <p className="text-center text-muted w-100">
            No hay eventos cargados.
          </p>
        ) : (
          eventos.map((evento) => (
            <div
              className="mb-4 col-md-6 col-lg-4 col-xl-3 d-flex"
              key={evento.id}
            >
              <EventoCard evento={evento} />
            </div>
          ))
        )}
      </div>
      <div className="mt-5">
        <h2 className="text-secondary mb-4">Espacios culturales</h2>
        <div className="row">
          {lugares.length === 0 ? (
            <p className="text-muted text-center w-100">
              No hay espacios registrados.
            </p>
          ) : (
            lugares.map((lugar) => (
              <div
                key={lugar.id}
                className="mb-4 col-12 col-md-6 col-lg-6 col-xl-4 d-flex"
              >
                <LugarCard lugar={lugar} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
