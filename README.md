# API de Banco Digital

## Índice

- [Título](#api-de-banco-digital)
- [Índice](#índice)
- [Descrição e Status do Projeto](#page_facing_up-descrição-do-projeto)
- [Funcionalidades da Aplicação](#hammer-funcionalidades-da-aplicação)
- [Pré Requisitos](#dizzy-pré-requisitos)
- [Rodando o Backend](#game_die-rodando-o-backend-servidor)
- [Executando o Projeto](#arrow_forward-executando-o-projeto)
- [Testando a API](#computer-testando-a-api)


## :page_facing_up: Descrição do Projeto
O piloto de uma API de banco digital desenvolvida em JavaScript, focada no backend, que oferece funcionalidades completas para gerenciar contas bancárias e realizar operações financeiras.

![#status do projeto](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)

## :hammer: Funcionalidades da aplicação

- Listar contas bancárias
- Atualizar usuário da conta bancária
- Excluir Conta
- Depositar
- Sacar
- Transferir
- Saldo
- Extrato
- Listar saques
- Listar depósitos
- Listar transferências


## :dizzy: Pré-requisitos
 
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

## :game_die: Rodando o Backend (servidor)

```bash
# Clone este repositório
$ git clone <https://github.com/fcharbel/api-banco-digital>

# Navegue até o diretório do projeto:
$ cd api-banco-digital

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>
```
## :arrow_forward: Executando o Projeto

Para iniciar o servidor e começar a utilizar a API, você pode executar o seguinte comando:

```bash
npm run dev
```
O servidor será iniciado utilizando o Nodemon, o que permite que você faça alterações no código sem precisar reiniciar manualmente o servidor.

## :computer: Testando a API
Para testar a API, você pode usar o [Insomnia](https://insomnia.rest/download), que é uma plataforma para testar e documentar APIs. 

###  Criar conta bancária: 
#### `POST` `/contas`
Faz a listagem de todas as contas bancárias do banco, mediante senha informada (passada como query params na url).

![](./assets/listar-contas.png)

### Atualizar usuário da conta bancária

#### `PUT` `/contas/:numeroConta/usuario`

Atualiza os dados de usuário de uma conta bancária. 

![](./assets/atualizar-usuario.png)

### Excluir Conta

#### `DELETE` `/contas/:numeroConta`

Esta funcionalidade exclui uma conta bancária existente.

![](./assets/excluir-conta.png)

### Depositar

#### `POST` `/transacoes/depositar`

Soma o valor do depósito ao saldo de uma conta válida e registra essa transação.

![](./assets/depositar.png)

### Sacar

#### `POST` `/transacoes/sacar`

Realiza o saque de um valor em uma determinada conta bancária e registra essa transação.

![](./assets/sacar.png)


### Tranferir

#### `POST` `/transacoes/transferir`

Permite a transferência de recursos (dinheiro) de uma conta bancária para outra e registra essa transação.

![](./assets/transferir.png)

### Saldo

#### `GET` `/contas/saldo?numero_conta=123&senha=123`

Esta funcionalidade retorna o saldo de uma conta bancária. Na url deverá ser passados os seguintes query params:

![](./assets/saldo.png)


### Extrato

#### `GET` `/contas/extrato?numero_conta=123&senha=123`

Lista todas as transações realizadas de uma conta específica. 

![](./assets/extrato.png)


### Listar depósitos

#### `GET` `/depositos?senha_banco=Cubos123Bank`

Faz a listagem de todos os depósitos realizados no banco, mediante senha informada (passada como query params na url).

![](./assets/listar-depositos.png)

### Listar saques

#### `GET` `/saques?senha_banco=Cubos123Bank`

Faz a listagem de todos os saques realizados no banco, mediante senha informada (passada como query params na url).

![](./assets/listar-saques.png)


### Listar transferências

#### `GET` `/transferencias?senha_banco=Cubos123Bank`

Faz a listagem de todos as transferências realizadas no banco, mediante senha informada (passada como query params na url).

![](./assets/listar-transferencias.png)


### :memo: Observações
Certifique-se de que as bibliotecas utilizadas, como ```express```, ```nodemon```, e ```date-fns```, estão sendo instaladas automaticamente pelo comando ```npm install```. Caso contrário, verifique se elas estão listadas corretamente no arquivo ```package.json``` sob a seção ```dependencies```.

##  Autor

<a href="https://www.linkedin.com/in/fernanda-charbel/">
 <img style="border-radius: 50%;" src="./assets/autora.png" width="100px;" alt=""/>
 <br />
 <sub><b>Fernanda Charbel</b></sub></a> <a href="https://www.linkedin.com/in/fernanda-charbel/" title=""> 🌺 </a>
 <br />

