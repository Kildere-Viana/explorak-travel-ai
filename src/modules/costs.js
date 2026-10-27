// Valores em unidades menores: centavos para BRL, EUR e USD. Sem conversão implícita.
export function summarizeCosts(items) {
  if (!Array.isArray(items)) throw new Error('Custos devem ser uma lista');
  const totals = {};
  for (const item of items) {
    if (!item || !['BRL', 'EUR', 'USD'].includes(item.currency) || !Number.isSafeInteger(item.amountMinor) || item.amountMinor < 0 || !Number.isSafeInteger(item.quantity) || item.quantity < 1) throw new Error('Custo inválido');
    const total = (totals[item.currency] ?? 0) + item.amountMinor * item.quantity;
    if (!Number.isSafeInteger(total)) throw new Error('Custo excede o limite permitido');
    totals[item.currency] = total;
  }
  return { totalsMinorByCurrency: totals, estimated: true, exchangeConversion: false };
}
