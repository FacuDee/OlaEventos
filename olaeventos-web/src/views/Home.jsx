// ...existing imports...
import React, { useEffect, useState } from 'react';
import EventoCard from '../components/EventoCard';
import PublicidadCarousel from '../components/PublicidadCarousel';

function Home() {
  const [eventos, setEventos] = useState([]);
  const [publicidades, setPublicidades] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/eventos')
      .then(res => res.json())
      .then(setEventos);

    fetch('http://localhost:3000/publicidades')
      .then(res => res.json())
      .then(setPublicidades)
      .catch(() => setPublicidades([]));
  }, []);

  return (
    <div
      className="py-4"
      style={{
        backgroundColor: '#121212',
        minHeight: '100vh',
        fontFamily: 'Montserrat, sans-serif',
        color: 'white',
        paddingLeft: '2vw',
        paddingRight: '2vw',
      }}
    >
      {/* Carrusel de publicidades */}

      <PublicidadCarousel publicidades={publicidades} />

      <div className="d-flex justify-content-between flex-wrap align-items-center mb-4">
        <h1 className="text-secondary">Agenda Cultural de Olavarría</h1>
      </div>

      <div className="row">
        {eventos.length === 0 ? (
          <p className="text-center text-muted w-100">No hay eventos cargados.</p>
        ) : (
          eventos.map(evento => (
            <div className="mb-4 col-md-6 col-lg-4 col-xl-3 d-flex" key={evento.id}>
              <EventoCard evento={evento} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;