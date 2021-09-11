const axios = require('./axios')

module.exports = {
    async seedBling(){
        const pipedriveDeals = await axios.pipeDrive.get('deals?status=won')
        const deals = pipedriveDeals.data
        var result = []

        for(let element of deals.data){
            let xml = `       
            <?xml version="1.0" encoding="UTF-8"?>
            <pedido>
            <cliente>
            <nome>${element.person_id.name}</nome>
            <fone>${element.person_id.phone.value}</fone>
            </cliente>
            <itens>
            <item>
            <codigo>000</codigo>
            <descricao>Caneta 001</descricao>
            <un>Pç</un>
            <qtde>10</qtde>
            <vlr_unit>1.68</vlr_unit>
            </item>
            <item>
            <codigo>000</codigo>
            <descricao>Caderno 002</descricao>
            <un>Un</un>
            <qtde>3</qtde>
            <vlr_unit>3.75</vlr_unit>
            </item>
            <item>
            <codigo>000</codigo>
            <descricao>Teclado 003</descricao>
            <un>Cx</un>
            <qtde>7</qtde>
            <vlr_unit>18.65</vlr_unit>
            </item>
            </itens>
            </pedido>`

            let blingPedidos = await axios.bling.post(`pedido/json/?xml=${encodeURI(xml)}`)
            result.push(blingPedidos.data)
        }
        
        return result
    } 
}
    
