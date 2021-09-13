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
  let obj = await createObj(objeto.data)
  let filterObj = obj.filter(item =>{
    if(!Object.keys(item).length){
      return
    }
    return item
  })
  const business = await Business.create(filterObj)
  return business;
}


function getDatas(objeto){
  let dateList = []
  objeto.retorno.pedidos.forEach(element => {
    dateList.push(element.pedido.data)
  });

  let uniqueDate = [... new Set(dateList)]

  return uniqueDate
}

async function createObj(objeto){
  const blacklist = await validate(objeto)
  let result = []
  let resultA = ''
  let resultB = ''
  let valorTotal = 0
  objeto.retorno.pedidos.forEach((element, index)=>{
    let posicao = index+1
    if(blacklist.includes(element.pedido.data)){
      return false
    }
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

async function validate(objeto){

  let blackList = []
  let objData = getDatas(objeto)
  let allBling = await Business.find({})

  allBling.forEach(element => {
    let date = element.data.toISOString().split('T')[0]
    if(objData.includes(date)){
      blackList.push(date)
    }
  });
  return [... blackList]
}

module.exports = {
  async seedBling(){
    const pipedriveDeals = await axios.pipeDrive.get('deals?status=won')
    const deals = pipedriveDeals.data
    let result = []
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
    const objeto = await axios.bling.get('pedidos/json/')
    saveBling(objeto)
    return result
  },

  async getAllBling(){
    let allBling = await Business.find({})
    return allBling
  }
} 
    
