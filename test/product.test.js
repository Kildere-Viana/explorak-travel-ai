import test from 'node:test';
import assert from 'node:assert/strict';
import { dispatch } from '../src/app.js';
import { createItinerary } from '../src/modules/itineraries.js';
import { summarizeCosts } from '../src/modules/costs.js';
import { validateOpportunity } from '../src/integrations/radar/index.js';
test('seis módulos acessíveis e dados demonstrativos identificados', async () => {
  for (const path of ['destinations', 'hotels', 'restaurants', 'activities']) {
    const r = await dispatch('GET', '/api/' + path); assert.equal(r.status, 200); assert.equal(r.data.source, 'demo');
  }
  assert.equal((await dispatch('POST', '/api/itineraries', { destinationId: 'lisbon', startDate: '2027-01-31', days: 2, travelers: 2 })).data.days[1].date, '2027-02-01');
  assert.equal((await dispatch('POST', '/api/costs/summary', { items: [] })).status, 200);
});
test('roteiro rejeita datas inexistentes e destino inválido', () => {
  for (const patch of [{ startDate: '2027-02-30' }, { destinationId: 'unknown' }, { days: 0 }]) assert.throws(() => createItinerary({ destinationId: 'lisbon', startDate: '2027-01-01', days: 2, travelers: 2, ...patch }));
});
test('custos mantêm moedas separadas e validam valores', () => {
  assert.deepEqual(summarizeCosts([{ currency: 'EUR', amountMinor: 1000, quantity: 2 }, { currency: 'USD', amountMinor: 1500, quantity: 1 }]).totalsMinorByCurrency, { EUR: 2000, USD: 1500 });
  assert.throws(() => summarizeCosts([{ currency: 'EUR', amountMinor: -1, quantity: 1 }]));
});
test('Radar indisponível não impede planejamento', async () => {
  assert.equal((await dispatch('GET', '/api/radar/opportunities')).status, 503);
  assert.equal((await dispatch('GET', '/api/destinations')).status, 200);
});
test('contrato Radar exige oferta vigente e revalidação', () => {
  const now = new Date('2027-01-01T12:00:00Z');
  const offer = { schemaVersion: '1', id: 'sample', cabin: 'business', origin: 'FOR', destination: 'LIS', currency: 'BRL', totalMinor: 900000, observedAt: '2027-01-01T11:00:00Z', expiresAt: '2027-01-01T13:00:00Z', bookingUrl: 'https://example.com' };
  assert.equal(validateOpportunity(offer, now).priceRequiresRevalidation, true);
  assert.throws(() => validateOpportunity({ ...offer, expiresAt: '2027-01-01T10:00:00Z' }, now));
});
