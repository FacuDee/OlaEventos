// src/services/eventosService.js
const API_URL = 'http://localhost:3000/eventos';

export async function getEventos() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener los eventos');
  return await res.json();
}
