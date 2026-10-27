# ExploraK Travel AI

Produto-base de uma agência híbrida para Europa e EUA: planejamento digital com evolução para curadoria humana. Este repositório contém uma API local de demonstração, sem banco de dados, interface móvel, IA conectada ou reservas reais.

## Separação dos produtos

| Responsabilidade | Travel AI, este repositório | Radar, produto separado |
| --- | --- | --- |
| Destinos, roteiros e orçamento | Dono | Não implementa |
| Hotéis, restaurantes e passeios | Curadoria e planejamento | Não implementa |
| Coleta e histórico de tarifas aéreas | Consome referências | Dono |
| Oportunidades econômica e executiva | Apresenta via integração futura | Classifica e alerta |
| Atendimento humano | Evolução neste produto | Sem responsabilidade |

Não há banco compartilhado nem importação de código interno do Radar. A integração real está desabilitada por padrão e retorna 503 explícito. Nenhuma oferta é inventada para simular conexão.

## Executar

Requer Node.js 24 ou superior. Não há dependências para instalar.

```sh
npm start
# Em outro terminal:
curl http://127.0.0.1:3000/health
npm run check
```

O servidor escuta apenas em localhost. `PORT=3001 npm start` altera a porta. Não publicar esta API de demonstração como serviço de produção.

## Módulos e API

| Módulo | Código | Endpoint |
| --- | --- | --- |
| Destinos | src/modules/destinations.js | GET /api/destinations |
| Roteiros | src/modules/itineraries.js | POST /api/itineraries |
| Custos | src/modules/costs.js | POST /api/costs/summary |
| Hotéis | src/modules/hotels.js | GET /api/hotels |
| Restaurantes | src/modules/restaurants.js | GET /api/restaurants |
| Passeios | src/modules/activities.js | GET /api/activities |
| Fronteira Radar | src/integrations/radar/index.js | GET /api/radar/opportunities |

```sh
curl -X POST http://127.0.0.1:3000/api/itineraries \
  -H 'Content-Type: application/json' \
  -d '{"destinationId":"lisbon","startDate":"2027-01-10","days":3,"travelers":2}'
curl -X POST http://127.0.0.1:3000/api/costs/summary \
  -H 'Content-Type: application/json' \
  -d '{"items":[{"currency":"EUR","amountMinor":12000,"quantity":3}]}'
```

Roteiros são rascunhos gerados na resposta e não são salvos. Custos são estimativas inseridas pelo usuário, em centavos e separados por moeda. Hotéis, restaurantes e passeios são fictícios, sem preços ou disponibilidade. Lisboa e Nova York exemplificam as duas regiões. Nenhum dado pessoal deve ser incluído nesta demonstração.

## Documentação

- [Arquitetura e modelo de dados](docs/architecture.md)
- [Contrato Radar v1](docs/radar-contract.md)
- [Evolução do MVP](docs/roadmap.md)

## Referências técnicas

- [Node.js HTTP](https://nodejs.org/api/http.html)
- [Test runner nativo](https://nodejs.org/api/test.html)
- [GitHub Actions com Node.js](https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs)
