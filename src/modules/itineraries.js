import { destinations } from './destinations.js';
export function createItinerary({ destinationId, startDate, days, travelers }) {
  if (!destinations.some(d => d.id === destinationId)) throw new Error('Destino desconhecido');
  if (!Number.isInteger(days) || days < 1 || days > 60) throw new Error('Dias devem estar entre 1 e 60');
  if (!Number.isInteger(travelers) || travelers < 1 || travelers > 50) throw new Error('Viajantes devem estar entre 1 e 50');
  const date = new Date(startDate + 'T00:00:00Z');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !Number.isFinite(date.valueOf()) || date.toISOString().slice(0, 10) !== startDate) throw new Error('Data inválida');
  return { destinationId, travelers, status: 'draft', days: Array.from({ length: days }, (_, index) => {
    const day = new Date(date); day.setUTCDate(day.getUTCDate() + index);
    return { date: day.toISOString().slice(0, 10), items: [] };
  }) };
}
