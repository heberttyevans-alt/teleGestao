# teleGestao

Sistema de gestão de ordens de serviço e tarefas para empresas de assistência técnica.

## Tecnologias e dependências

O projeto está configurado com:

- **Node.js** e **npm** para executar o projeto e instalar os pacotes.
- **Express 5** (`express`) para a aplicação web.
- **EJS** (`ejs`) para templates.
- **Prisma 7** (`prisma` e `@prisma/client`) para acesso ao banco de dados.
- **MariaDB** (`@prisma/adapter-mariadb`) como adaptador de banco de dados.
- **dotenv** para carregar variáveis de ambiente.
- **nodemon** como ferramenta de desenvolvimento para reiniciar o processo durante alterações.
- **expres** também está declarado no `package.json`; é um pacote separado de `express`.

As versões exatas instaladas são controladas pelo `package-lock.json`. O comando `npm ci` instala todas as dependências declaradas no projeto, incluindo as dependências de desenvolvimento.

## Pré-requisitos

1. Instale o **Node.js 22.12 ou superior** (e o npm incluído com ele).
2. Tenha acesso a um banco de dados **MySQL ou MariaDB** para a configuração do Prisma.
3. Clone o repositório e acesse a pasta do projeto:

   ```bash
   git clone https://github.com/heberttyevans-alt/teleGestao.git
   cd teleGestao
   ```

## Instalação

Na pasta do projeto, instale todas as dependências usando o arquivo de lock:

```bash
npm ci
```

## Configuração do banco de dados

O schema do Prisma está em `prisma/schema.prisma` e declara o provedor `mysql`. A configuração `prisma7.config.ts` lê a variável `DATABASE_URL`.

1. Crie um banco de dados MySQL ou MariaDB.
2. Crie um arquivo `.env` na raiz do projeto.
3. Adicione a URL de conexão ao arquivo, substituindo os valores pelos dados do seu banco:

   ```env
   DATABASE_URL="mysql://USUARIO:SENHA@localhost:3306/NOME_DO_BANCO"
   ```

Não compartilhe nem envie o arquivo `.env` ao GitHub; ele contém credenciais e está ignorado pelo Git.

## Executar

O comando configurado para iniciar o projeto é:

```bash
npm start
```

## Estado atual do projeto

O repositório contém a configuração inicial das dependências e do Prisma, além das pastas de rotas e serviços. No momento, `server.js` e os arquivos de rotas, controller e serviço de usuários estão vazios; portanto, a aplicação ainda não inicia um servidor web funcional. O schema do Prisma também ainda não define modelos. As funcionalidades de ordens de serviço, tarefas e gestão de usuários precisam ser implementadas.

O script `npm test` também é apenas um placeholder no momento e termina com uma mensagem de que não há testes configurados.
