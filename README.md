# Teste-LinkApi

● Criar contas testes nas plataformas Pipedrive e Bling.

● Criar uma integração entre as plataformas Pipedrive e Bling( A integração deve buscar as oportunidades com status igual a ganho no Pipedrive, depois inseri-las como pedido no Bling).

● Criar banco de dados mongo, existem serviços como MongoDB Atlas para criar de graça

● Criar uma collection no banco de dados MongoDB agregando as oportunidades inseridas no Bling por dia e valor total.

● Criar endpoint para trazer os dados consolidados da collection do MongoDB.


![ezgif-1-28abc72e011d](https://user-images.githubusercontent.com/71731452/133043169-46460b24-5c9d-4600-8f2a-8ca9b9c66359.gif)


## Começando

Para começar clone a versão mais recente disponivel e siga os passos a seguir.

### Pré-requisitos

* node.js v10.19.0
* yarn 1.22.11

### Instalando

Em um terminal como acesso a pasta root do projeto executamos os comandos

* yarn
* yarn dev

## Utilizando a API

#### Primeiro chame a rota que alimenta o banco de dados e o bling (http://localhost:3000/business/seed-bling)

![image](https://user-images.githubusercontent.com/71731452/133043769-751a9170-9d45-458b-a204-65dfd202c646.png)

#### Agora chame a endpoint que retorna os valores por dia e valor total (http://localhost:3000/business/get-bling)

![Sem título](https://user-images.githubusercontent.com/71731452/133043183-16d379b7-010e-49a7-b283-113a8abb7245.png)

## Built With

* [Express](https://expressjs.com/pt-br/)
* [Mongoose](https://mongoosejs.com/)

## Autores

* **Marcelo Assis** - [marceloapd](https://github.com/marceloapd)
