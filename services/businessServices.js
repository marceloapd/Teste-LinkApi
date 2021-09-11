const axios = require('./axios')
const convert = require('xml-js')
const Business = require('../models/business')

async function getProducts(id){
    let itens = []
    let pipedriveProducts = await axios.pipeDrive.get(`deals/${id}/products?include_product_data=${id}`)
    let produtos = pipedriveProducts.data
    for (let produto of produtos.data){
        itens.push(
            {
              "codigo": `${produto.product_id}`,
              "descricao": `${produto.name}`,
              "un": "Pç",
              "qtde": `${produto.quantity}`,
              "vlr_unit": `${produto.item_price}`
            })
    }
    return itens
}

async function saveBling(objeto){
  const business = await Business.create(createObj(objeto.data))
  return business;
}

function createObj(objeto){
    let result = []
    let resultA = ''
    let resultB = ''
    let valorTotal = 0
    objeto.retorno.pedidos.every((element, index)=>{
      let posicao = index+1
      if(posicao>=objeto.retorno.pedidos.length){
        return false
      }else{
        if(element.pedido.data == objeto.retorno.pedidos[posicao].pedido.data){
          valorTotal += parseInt(element.pedido.totalvenda) + parseInt(objeto.retorno.pedidos[posicao].pedido.totalvenda)
          resultA = {
            "data": element.pedido.data,
            "valorTotal": valorTotal
          }
        }
        else{
          resultB = {
              "data": element.pedido.data,
              "valorTotal": parseInt(element.pedido.totalvenda)
            }
          }
          return true
        }
      })
    
    result.push(resultA, resultB)

    return result
}



module.exports = {
  async seedBling(){
    const objeto = await axios.bling.get('pedidos/json/')
    const pipedriveDeals = await axios.pipeDrive.get('deals?status=won')
    const deals = pipedriveDeals.data
    var result = []
    
      for(let element of deals.data){
          let json = {
            "pedido": {
              "cliente": {
              "nome": {
                  "_text": element.person_id.name
              },
              "fone": {
                  "_text": element.person_id.phone[0].value
              }
              },
              "itens": {
                  "item": await getProducts(element.id)
              }
            }
          }
          let xml = convert.json2xml(json, {compact: true, ignoreComment: false, spaces: 4})
          let blingPedidos = await axios.bling.post(`pedido/json/?xml=${encodeURI(xml)}`)
          result.push(blingPedidos.data)
      }
      saveBling(objeto)
      return result
  },

  async getAllBling(){
    let allBling = await Business.find({})
    console.log(allBling)
    return allBling
  }
} 
    
