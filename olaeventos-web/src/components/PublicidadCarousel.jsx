import React, { useEffect } from "react";
import { Carousel } from "bootstrap";

function PublicidadCarousel({ publicidades }) {
  useEffect(() => {
    if (publicidades.length > 0) {
      const el = document.getElementById("publicidadCarousel");
      if (el) {
        new Carousel(el, {
          interval: 3000,
          ride: "carousel",
          pause: false,
        });
      }
    }
  }, [publicidades]); // Se activa cuando se cargan las publicidades

  if (!publicidades.length) return null;

  return (
    <div
      id="publicidadCarousel"
      className="carousel slide my-5"
      data-bs-ride="carousel"
      data-bs-interval="3000"
      data-bs-pause="false"
    >
      <div className="carousel-inner rounded shadow">
        {publicidades.map((pub, idx) => (
          <div
            className={`carousel-item${idx === 0 ? " active" : ""}`}
            key={pub.id}
          >
            <a href={pub.link} target="_blank" rel="noopener noreferrer">
              <img
                src={`http://localhost:3000${pub.imagen}`}
                className="d-block w-100"
                alt={`Publicidad ${idx + 1}`}
                style={{
                  maxHeight: 550,
                  maxWidth: 1200,
                  objectFit: "cover",
                  background: "#222",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </a>
          </div>
        ))}
      </div>

      {publicidades.length > 1 && (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#publicidadCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#publicidadCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </>
      )}
    </div>
  );
}

export default PublicidadCarousel;
