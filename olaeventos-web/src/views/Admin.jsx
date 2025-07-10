import React, { useEffect, useState } from "react";
import EventosAdminSection from "../components/EventosAdminSection";
import LugaresAdminSection from "../components/LugaresAdminSection";

function Admin() {
  const [eventos, setEventos] = useState([]);
  const [lugares, setLugares] = useState([]);

  useEffect(() => {
    cargarEventos();
    cargarLugares();
  }, []);

  const cargarEventos = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/eventos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setEventos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const cargarLugares = async () => {
    try {
      const res = await fetch("http://localhost:3000/lugares");
      const data = await res.json();
      setLugares(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid bg-dark text-white min-vh-100 p-4">
      <EventosAdminSection eventos={eventos} setEventos={setEventos} />
      <hr className="text-secondary my-5" />
      <LugaresAdminSection lugares={lugares} setLugares={setLugares} />
    </div>
  );
}

export default Admin;
