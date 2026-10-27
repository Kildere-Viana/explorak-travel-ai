import { destinations } from './modules/destinations.js';
import { hotels } from './modules/hotels.js';
import { restaurants } from './modules/restaurants.js';
import { activities } from './modules/activities.js';
import { createItinerary } from './modules/itineraries.js';
import { summarizeCosts } from './modules/costs.js';
import { DisabledRadarGateway, RadarUnavailableError } from './integrations/radar/index.js';
export async function dispatch(method, path, body = {}, radar = new DisabledRadarGateway()) {
  if (method === 'GET' && path === '/health') return { status: 200, data: { status: 'ok', product: 'explorak-travel-ai', mode: 'demo' } };
  const catalogs = { '/api/destinations': destinations, '/api/hotels': hotels, '/api/restaurants': restaurants, '/api/activities': activities };
  if (method === 'GET' && catalogs[path]) return { status: 200, data: { source: 'demo', items: catalogs[path] } };
  if (method === 'GET' && path === '/api/radar/opportunities') {
    try { return { status: 200, data: await radar.searchOpportunities() }; }
    catch (error) { if (error instanceof RadarUnavailableError) return { status: 503, data: { code: 'RADAR_UNAVAILABLE', message: error.message } }; throw error; }
  }
  try {
    if (method === 'POST' && path === '/api/itineraries') return { status: 200, data: createItinerary(body) };
    if (method === 'POST' && path === '/api/costs/summary') return { status: 200, data: summarizeCosts(body.items) };
  } catch (error) { return { status: 400, data: { error: error.message } }; }
  return { status: 404, data: { error: 'Rota não encontrada' } };
}
