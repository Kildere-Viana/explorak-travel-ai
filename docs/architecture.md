# Arquitetura e decisões iniciais

Status: esqueleto executável, não uma agência operacional.

Adotamos um monólito modular no Travel AI para reduzir custo e complexidade. O núcleo usa JavaScript ESM e funções independentes de HTTP, que poderão atender um aplicativo móvel. Não existe necessidade inicial de microsserviços por módulo. Radar é um contexto de negócio separado, integrado por uma porta versionada, sem acesso direto ao banco de qualquer produto.

## Fluxo

Cliente futuro → API Travel AI → módulos de planejamento.
API Travel AI → porta Radar → adaptador HTTP futuro → serviço Radar.

A indisponibilidade do Radar não bloqueia destinos, roteiros ou custos. Nesta versão, a porta desabilitada responde RADAR_UNAVAILABLE. O validador de ofertas já existe para o futuro adaptador, mas não há adaptador HTTP conectado.

## Modelo atual e evolução persistente

| Entidade | Campos e relações | Situação |
| --- | --- | --- |
| Destination | id, name, country, region, currency, timezone | Catálogo em memória |
| Itinerary | destinationId, travelers, status, days[] | Gerado sem persistência |
| ItineraryDay | date, items[] | Itens vazios para futura edição |
| CostItem | currency, amountMinor, quantity | Recebido para cálculo |
| Hotel / Restaurant / Activity | id, destinationId, name, source, bookable, price | Catálogo fictício |
| RadarOpportunity | referência externa versionada | Validação isolada |
| Trip / Traveler / Consultation | proprietário, preferências, consentimento, atendimento | Planejado, não implementado |

No próximo incremento, Trip terá id e ownerId; Itinerary e CostItem terão tripId. Itens de roteiro terão referências a hotéis, restaurantes ou passeios e duração. A primeira persistência deverá incluir migrações, isolamento por proprietário e testes de autorização. Ofertas aéreas permanecem referências externas com instante de observação, nunca reservas garantidas.

## Limites operacionais

Sem login, pagamentos, emissão, reservas, coleta de tarifas, câmbio automático ou recomendações por IA. API local com limite de corpo de 64 KiB; sem persistência ou exposição pública. Antes de produção: autenticação, autorização, validação de esquema, limites de uso, logs sem dados pessoais, monitoramento, backup e política de retenção. Não armazenar documentos de viagem nesta etapa.
