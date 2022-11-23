# NG.CASH app
Para rodar a aplicação é necessário ter o [Docker](https://www.docker.com/) instalado, com a ferramenta [docker-compose](https://docs.docker.com/compose/install/) e as imagens do [node](https://hub.docker.com/_/node) e [postgres](https://hub.docker.com/_/postgres). Depois é só entrar no diretório do projeto:
```
cd C:/caminho-para-o-projeto/ng-cash-app
```
E então executar:
```
docker compose -f server/docker-compose.backend.yml up -d --build && docker compose -f web/docker-compose.frontend.yml up -d
```
Após isso os containers já estarão sendo executados. Mas antes de usar a aplicação é necessário configurar o banco de dados, executando um arquivo SQL. No terminal execute:
```
docker ps
```
Isso vai te mostrar todos os containers que estão rodando, você precisa do nome do container que tem como imagem o **postgres**. Em seguida:
```
docker exec -it nome-do-container bash
```
E então:
```
psql -U postgres -d ngcash -f docker-entrypoint-initdb.d/create_tables.sql
```
Agora está tudo certo! A aplicação estará disponível em http://localhost:3000.

# Dependências
## Frontend
- NextJS
- TypeScript
- Nookies
- React Hook Form
- TailwindCSS
- HeadlessUI
## Backend
- Express
- TypeScript
- Jest
- Json Web Token
- Bcrypt
- Pg Promise (PostgreSQL interface)
