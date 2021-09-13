# Teste-LinkApi

REQUISITOS

● Criar contas testes nas plataformas Pipedrive e Bling.

● Criar uma integração entre as plataformas Pipedrive e Bling( A integração deve buscar as oportunidades com status igual a ganho no Pipedrive, depois inseri-las como pedido no Bling).

● Criar banco de dados mongo, existem serviços como MongoDB Atlas para criar de graça

● Criar uma collection no banco de dados MongoDB agregando as oportunidades inseridas no Bling por dia e valor total.

● Criar endpoint para trazer os dados consolidados da collection do MongoDB.


![ezgif-2-926126238735 (1)](https://im.ezgif.com/tmp/ezgif-1-28abc72e011d.gif)

## Começando

Para começar clone a versão mais recente disponivel e siga os passos a seguir.

### Pré-requisitos

* node.js v10.19.0
* yarn 1.22.11

### Instalando

Em um terminal executamos os comandos

* yarn

## Utilizando a API

# Primeiro chame a rota que alimenta o banco de dados e o bling http://localhost:3000/business/seed-bling

# Agora chame a endpoint que retorna as oportunidades por dia e valor total.

## Built With

* [Venom-bot](https://www.npmjs.com/package/venom-bot)

## Autores

* **Marcelo Assis** - [marceloapd](https://github.com/marceloapd)
* **Matheus Assis** - [MatheusAssisM](https://github.com/MatheusAssisM)

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para obter detalhes
