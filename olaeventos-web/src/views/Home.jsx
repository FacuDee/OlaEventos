import React, { useEffect, useState } from "react";
import EventoCard from "../components/EventoCard";
import LugarSlider from "../components/LugarSlider";
import PublicidadCarousel from "../components/PublicidadCarousel";

function Home() {
  const [eventos, setEventos] = useState([]);
  const [publicidades, setPublicidades] = useState([]);
  const [lugares, setLugares] = useState([]);
  const [mostrarCantidad, setMostrarCantidad] = useState(8);
  const [flyerUrl, setFlyerUrl] = useState(null);

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

  const lugaresMunicipales = lugares.filter((l) => l.tipo === "Municipal");
  const lugaresIndependientes = lugares.filter(
    (l) => l.tipo === "Independiente"
  );
  const lugaresPrivados = lugares.filter((lugar) => lugar.tipo === "Privado");
  const lugaresClubes = lugares.filter((lugar) => lugar.tipo === "Club");

  const eventosAMostrar = eventos.slice(0, mostrarCantidad);

  return (
    <div
      className="py-4"
      style={{
        backgroundColor: "var(--bg-color)",
        minHeight: "100vh",
        fontFamily: "Montserrat, sans-serif",
        color: "var(--text-color)",
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
        {eventosAMostrar.length === 0 ? (
          <p className="text-center text-muted w-100">
            No hay eventos cargados.
          </p>
        ) : (
          eventosAMostrar.map((evento) => (
            <div
              className="mb-4 col-md-6 col-lg-4 col-xl-3 d-flex"
              key={evento.id}
            >
              <EventoCard evento={evento} onFlyerClick={setFlyerUrl} />
            </div>
          ))
        )}
      </div>

      {mostrarCantidad < eventos.length && (
        <div className="text-center mb-4">
          <button
            className="btn btn-outline-warning mt-3"
            onClick={() => setMostrarCantidad(mostrarCantidad + 4)}
          >
            Mostrar más
          </button>
        </div>
      )}

      <div className="mt-5">
        <h1 className="text-secondary mb-4">Espacios culturales</h1>

        {lugares.length === 0 ? (
          <p className="text-muted text-center w-100">
            No hay espacios registrados.
          </p>
        ) : (
          <>
            {lugaresMunicipales.length > 0 && (
              <>
                <h4 className="text-warning mt-4 mb-3">Municipales</h4>
                <LugarSlider lugares={lugaresMunicipales} />
              </>
            )}

            {lugaresIndependientes.length > 0 && (
              <>
                <h4 className="text-warning mt-5 mb-3">Independientes</h4>
                <LugarSlider lugares={lugaresIndependientes} />
              </>
            )}

            {lugaresPrivados.length > 0 && (
              <>
                <h4 className="text-warning mt-5 mb-3">Privados</h4>
                <LugarSlider lugares={lugaresPrivados} />
              </>
            )}

            {lugaresClubes.length > 0 && (
              <>
                <h4 className="text-warning mt-5 mb-3">Clubes</h4>
                <LugarSlider lugares={lugaresClubes} />
              </>
            )}
          </>
        )}
      </div>

      {flyerUrl && (
        <div
          onClick={() => setFlyerUrl(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.9)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
            animation: "fadeIn 0.3s ease-in-out",
          }}
        >
          {/* Cierre con X */}
          <button
            onClick={() => setFlyerUrl(null)}
            style={{
              position: "absolute",
              top: "20px",
              right: "30px",
              fontSize: "2rem",
              color: "white",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              zIndex: 10000,
            }}
          >
            ❌
          </button>

          {/* Imagen del flyer */}
          <img
            src={flyerUrl}
            alt="Flyer del evento"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "10px",
              boxShadow: "0 0 20px rgba(255,255,255,0.3)",
              animation: "zoomIn 0.3s ease-in-out",
            }}
            onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic en la imagen
          />
        </div>
      )}
    </div>
  );
}

export default Home;
