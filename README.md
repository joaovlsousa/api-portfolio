# Joaov. REST API

### Sobre o projeto
<p>Este projeto trata-se de uma API que segue os princípios REST. Ela tem a finalidade de ser um serviço de upload de imagens, além de criar e fornecer dados sobre meus projetos, que são mostrados no <a href="https://joaov.vercel.app">meu portfólio</a>.</p>

### Tecnologias utilizadas
- NodeJs
- NestJs
- TypeScript
- Prisma (ORM)
- Zod
- Bcrypt
- Supabase
- UUID
- Jest

### Funcionalidades
- Autenticação (Credenciais)
- Criar um novo projeto
- Upload de imagem
- Listagem de todos projetos

### Endpoints
- /login `POST`
- /upload/:projectId `POST`
- /project `POST` `GET`

### Como executar

### Clone o projeto
- `git clone https://github.com/joaovlsousa/joaov-api.git`
- `cd joaov-api`

### Instale as dependências
- `npm i` ou `yarn` ou `pnpm i`

### Inicie a aplicação
- `npm run start:dev` ou `yarn start:dev` ou `pnpm start:dev`
- Agora você pode acessar as rotas em `http://localhost:3333`
