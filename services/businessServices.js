const axios = require('./axios')
const convert = require('xml-js')

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

module.exports = {
    async seedBling(){
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
        
        return result
    } 
}
    
