# Desenvolvedores

![Desenvolvedores](https://user-images.githubusercontent.com/38868063/125140593-408e4700-e0e9-11eb-9e78-f555eb33c792.png)

Desenvolveores é uma aplicação simples com funcionalidades CRUD em um front-end SPA

# Design
Todo o layout foi primeiro protopipado usando o [Figma](https://www.figma.com/file/ULZv1VrjtoWdYfU6CMoE8k/Desenvolvedores?node-id=0%3A1)

# Tecnologias
 - Typescript
 - TypeORM
 - Express
 - Docker
 - PostgreSQL

# Como executar
A aplicação foi encapsulada em um container Docker, para executa-lá é necessário ter o docker e docker-compose instalados na sua máquina.

Subindo a aplicação
```bash
docker-compose up
```

Despois isso a aplicação vai estar disponível em http://localhost:5000

Para encerrar a execução basta executar

```bash
docker-compose down
```

### Executar em segundo plano
Caso você não queria deixar a aplicação aberta em um terminal, use a flag de detached abaixo

```bash
docker-compose up -d
```

# Desenvolvimento
A estrutura desse repositório conta com o front-end da aplicação dentro da pasta `client/` e a API dentro de `server/`

## Server
O server conta com os seguintes scripts:
```
yarn dev      // executa a API em modo de desenvolvimento, escutando mudanças nos arquivos
yarn build    // compila a aplicação para JavaScript (saída em server/dist)
yarn test     // executa os testes unitários e de integração da API
yarn typeorm  // da acesso ao CLI do TypeORM
```

## Client
O server conta com os seguintes scripts:
```
yarn start      // executa o front-end em modo de desenvolvimento, escutando mudanças nos arquivos
yarn build      // compila a aplicação para JavaScript
```

# Licença

BSD-3-Clause © Bruno Fusieger 
