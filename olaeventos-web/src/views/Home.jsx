// src/views/Home.jsx

import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import EventoCard from '../components/EventoCard';
import FormularioEvento from '../components/FormularioEvento';

function Home() {
  const [eventos, setEventos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/eventos')
      .then(res => res.json())
      .then(setEventos);
  }, []);

  const handleEventoCreado = nuevoEvento => {
    setEventos(prev => [nuevoEvento, ...prev]);
    setMostrarFormulario(false);
  };

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
          <button
            className="btn btn-outline-light"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
          >
            {mostrarFormulario ? '✖️ Cancelar' : '➕ Nuevo Evento'}
          </button>
        </div>

        <div
          style={{
            maxHeight: mostrarFormulario ? '1000px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.5s ease',
          }}
        >
          {mostrarFormulario && (
            <FormularioEvento onEventoCreado={handleEventoCreado} />
          )}
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
