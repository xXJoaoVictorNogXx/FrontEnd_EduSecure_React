# EduSecure - Painel Web

Este é o repositório front-end do painel administrativo web do sistema **EduSecure**. O painel é responsável por consumir a API do backend (Spring Boot) para exibir as sincronizações de provas offline, gerenciar alunos e monitorar os status de envio com regras antifraude.

---

## 🚀 Tecnologias Utilizadas

O projeto foi inicializado com foco em performance, tipagem estática e componentes reutilizáveis, utilizando a seguinte stack:

* **[React](https://react.dev/) + [Vite](https://vitejs.dev/)**: Biblioteca principal e bundler ultrarrápido.
* **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática para garantir integridade na comunicação com o backend.
* **[Tailwind CSS](https://tailwindcss.com/)**: Estilização utilitária e responsiva.
* **[shadcn/ui](https://ui.shadcn.com/)**: Biblioteca de componentes acessíveis e customizáveis (arquitetura copy-paste).
* **[TanStack Query (React Query)](https://tanstack.com/query/latest)**: Gerenciamento de estado assíncrono, cache e requisições.
* **[Axios](https://axios-http.com/)**: Cliente HTTP para comunicação com a API.

---

## 📁 Estrutura de Pastas

A arquitetura do projeto foi desenhada para separar claramente responsabilidades, seguindo as melhores práticas para SPA:

```text
src/
├── assets/        # Arquivos estáticos e CSS global (Tailwind)
├── components/    # Componentes visuais
│   ├── shared/    # Componentes globais (Ex: Sidebar, Header)
│   └── ui/        # Componentes gerados pelo shadcn/ui
├── hooks/         # Hooks customizados do React
├── lib/           # Funções utilitárias (Ex: cn do Tailwind)
├── pages/         # Telas principais da aplicação (Ex: Dashboard, Login)
├── services/      # Configuração do Axios e chamadas à API
└── types/         # Interfaces e tipagens (Ex: Prova, SincronizacaoDTO)
⚙️ Instalação e Execução
Pré-requisitos
Node.js instalado.

Backend do EduSecure rodando localmente (padrão na porta 8080).

Passos para rodar localmente
Clone o repositório e acesse a pasta do front-end:

Bash
git clone <url-do-repositorio>
cd edusecure-web
Instale as dependências do projeto:

Bash
npm install
Inicie o servidor de desenvolvimento:

Bash
npm run dev
Acesse a aplicação no navegador em http://localhost:5173.

🛠️ Configurações Importantes Realizadas
Path Aliases (@/): Configurado nos arquivos vite.config.ts, tsconfig.json e tsconfig.app.json para facilitar importações relativas sem uso excessivo de ../.

Provedor Global: O QueryClientProvider do TanStack Query está configurado no arquivo raiz (main.tsx).

Instância da API: O Axios está configurado em src/services/api.ts com a Base URL do Spring Boot preparada para receber interceptors futuramente.
