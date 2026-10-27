/** Porta v1. Travel AI recebe referências de ofertas; Radar possui coleta, histórico e alertas. */
export class RadarUnavailableError extends Error {}
export class DisabledRadarGateway {
  async searchOpportunities() { throw new RadarUnavailableError('Integração Radar ainda não configurada'); }
}
export function validateOpportunity(offer, now = new Date()) {
  if (!offer || offer.schemaVersion !== '1' || typeof offer.id !== 'string' || !offer.id || !['economy', 'business'].includes(offer.cabin)) throw new Error('Oferta Radar inválida');
  if (!/^[A-Z]{3}$/.test(offer.origin) || !/^[A-Z]{3}$/.test(offer.destination) || !['BRL', 'EUR', 'USD'].includes(offer.currency) || !Number.isSafeInteger(offer.totalMinor) || offer.totalMinor < 0) throw new Error('Preço ou rota inválidos');
  const observed = Date.parse(offer.observedAt), expires = Date.parse(offer.expiresAt);
  if (!Number.isFinite(observed) || !Number.isFinite(expires) || observed > now.valueOf() || expires <= now.valueOf() || expires <= observed) throw new Error('Oferta expirada ou data inválida');
  const url = new URL(offer.bookingUrl);
  if (url.protocol !== 'https:') throw new Error('Link deve usar HTTPS');
  return { ...offer, priceRequiresRevalidation: true };
}
