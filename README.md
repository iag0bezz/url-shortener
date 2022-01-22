<h3 align="center">
  🔗 URL Shortener 🔗
</h3>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/iag0bezz/url-shortener?color=0bb682&style=for-the-badge">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/iag0bezz/url-shortener?color=0bb682&style=for-the-badge">
  
  <a href="https://github.com/iag0bezz/url-shortener/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/iag0bezz/url-shortener?color=0bb682&style=for-the-badge">
  </a>

  <a href="https://github.com/iag0bezz/url-shortener/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/iag0bezz/url-shortener?color=0bb682&style=for-the-badge">
  </a>
</p>

<p align="center">
  <a href="#-tecnologias">💡 Tecnologias</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">💻 Projeto</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar">🚀 Como executar</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">📝 Licença</a>
<br>

## 💡 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.JS](https://nodejs.org/en/)
- [Express](https://sass-lang.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://typeorm.io/)
- [TSyringe](https://www.npmjs.com/package/tsyringe)

<!-- Caso necessário, adicionar outras. -->

## 💻 Projeto

Este projeto tem o intuíto para facilitar a criação de urls customizadas e encurtadas. É necessário o usuário estar autenticado para gerenciar suas próprias urls e criar novas.
    
## 🚀 Como executar

### ✔️ Pré-requisitos

Você irá precisar das seguintes ferramentas em sua máquina: [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e [Yarn](https://classic.yarnpkg.com/) (opcional).
    
### 🎲 Executando o projeto
    
```bash
# Clone este repositório
$ git clone https://github.com/iag0bezz/url-shortener

# Acesse a pasta do projeto no terminal
$ cd url-shortener

# Instale as dependências
$ yarn install // npm install

# Rode as migrations
$ yarn typeorm migration:run || npm run typeorm migration:run

# Execute a aplicação em modo de desenvolvimento
$ yarn dev // npm run dev

# O servidor inciará na porta 3333 (http://localhost:3333/) 
```

## 📝 Licença

Este projeto usa a licença [MIT](https://github.com/iag0bezz/url-shortener/blob/main/LICENSE).

---

<p align="center">
    Feito com 🖤 por Iago Beserra 👋
</p>
