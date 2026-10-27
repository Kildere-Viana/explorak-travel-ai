# Caminho do MVP

## 0. Base entregue

Seis módulos, catálogos explicitamente fictícios para Europa e EUA, geração de rascunho de roteiro, cálculo separado por moeda, fronteira Radar desabilitada, testes e CI. Critério: npm run check passa sem credenciais externas.

## 1. Planejador utilizável

Criar aplicativo móvel com Expo/React Native consumindo esta API, cadastro de viagem, datas, viajantes, edição diária e custos. Adicionar banco relacional, migrações, autenticação e controle de propriedade antes de salvar dados de usuários. Critério: usuário cria, salva, reabre e edita uma viagem, sem acessar viagens de outro usuário.

## 2. Curadoria e atendimento híbrido

Trocar exemplos por catálogo editorial verificado, com fonte, data de revisão, categoria e link oficial. Incluir solicitação de consultoria, status e revisão humana. Critério: roteiro e orçamento revisáveis por um consultor com autorização registrada. Não prometer confirmação de reservas por meio de simples links.

## 3. Radar conectado

Confirmar contrato bilateral, adicionar detalhes dos trechos e passageiros, adaptador HTTP, autenticação, timeout, revalidação e testes de contrato. Critério: ofertas reais com origem, instante de observação e validade; falha do Radar mantém o planejador funcionando. Alertas continuam sob responsabilidade do Radar.

## 4. Assistência por IA e monetização

Introduzir sugestão de roteiros apoiada no catálogo verificado, revisão humana, orçamento de uso e avaliação de qualidade. Só depois avaliar afiliação e reservas com fornecedores contratados. Critério: sugestões rastreáveis às fontes, custos da operação medidos e nenhuma disponibilidade inventada.

Prioridade econômica: validar planejamento e procura por consultoria antes de contratar múltiplas APIs ou desenvolver emissão de passagens. Próxima entrega recomendada: uma viagem persistida com roteiro editável e orçamento manual. Escolher hospedagem, banco e provedor de autenticação nesse incremento, com base em custo e requisitos reais.
