# Fronteira Radar v1

Este documento é uma proposta do consumidor Travel AI. Não afirma que o serviço Radar já ofereça esta API. Validar o contrato nos dois repositórios antes de conectar.

## Porta

`RadarGateway.searchOpportunities(query)` deverá receber origin e destination como códigos IATA, datas de ida e volta, travelers, cabin (economy ou business) e moeda. O MVP local apenas sinaliza indisponibilidade, sem consultas externas.

Futuro adaptador: autenticação servidor a servidor, timeout de 5 segundos, cancelamento, repetição limitada apenas para leituras e validação de cada oferta. Falhas retornam indisponibilidade sem impedir planejamento. Nunca incluir credenciais no aplicativo móvel.

## Oferta normalizada

```json
{
  "schemaVersion": "1",
  "id": "radar-external-id",
  "origin": "FOR",
  "destination": "LIS",
  "cabin": "economy",
  "currency": "BRL",
  "totalMinor": 450000,
  "observedAt": "2027-01-01T12:00:00Z",
  "expiresAt": "2027-01-01T12:15:00Z",
  "bookingUrl": "https://example.com/offer"
}
```

Exemplo fictício. totalMinor deverá representar o total para todos os passageiros e trechos solicitados, com taxas obrigatórias. A proposta precisa acrescentar identificação da consulta e detalhes dos trechos antes da integração real para evitar comparação de escopos diferentes. Bagagem, regras tarifárias, fornecedor e conexões deverão ser normalizados nessa etapa.

O validador atual exige versão, identificação, cabine, rota, moeda, valor inteiro seguro, vigência e URL HTTPS. Acrescenta priceRequiresRevalidation=true. Antes de abrir links de fornecedores, implementar uma lista de domínios permitidos. Não transferir ofertas automaticamente para o orçamento ou concluir compra. Preço e disponibilidade precisam ser revalidados pelo fornecedor.

Radar possui coleta, histórico, classificação e notificações de tarifas. Travel AI possui a apresentação no contexto da viagem e a escolha do usuário. Cada produto mantém suas próprias credenciais, implantação e armazenamento. Evoluções incompatíveis exigem versão nova; testar contrato entre produtor e consumidor antes de liberar.
