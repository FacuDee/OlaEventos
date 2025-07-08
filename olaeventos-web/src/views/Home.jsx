// src/views/Home.jsx

import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import EventoCard from '../components/EventoCard';

function Home() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/eventos')
      .then(res => res.json())
      .then(setEventos);
  }, []);

  return (
    <>
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
    </>
  );
}

export default Home;
