import fastify from 'fastify'
import games from "./games.json" with {type: 'json'}

const server = fastify()

server.get("/jogos", (request, reply) => {
    let resposta
    const { dataMaior, dataLancamento, titulo } = request.query

        if(titulo){
            resposta = games.games
            .filter(g => g.titulo == titulo)
            .map(g => g)
        }
        else if (dataMaior == "true"){
            // Buscar Datas de Lancamento
            resposta = games.games
            .filter(g => g.ano_lancamento > Number(dataLancamento))
            .map(g => g.titulo)
        } else if(dataMaior == "false"){
            resposta = games.games
            .filter(g => g.ano_lancamento < Number(dataLancamento))
            .map(g => g.titulo)
        } else if(dataLancamento){
            resposta = games.games
            .filter(g => g.ano_lancamento == Number(dataLancamento))
            .map(g => g.titulo)
        } else {
        resposta = games.games.map(g => g.titulo)
    }

    reply.send(resposta)
})

server.get("/jogos/:titulo", (request, reply) => {
    const { titulo } = request.params
    const { atributo } = request.query
    let resposta = {
        titulo,
    }
    const jogo = games.games.find(g => g.titulo == titulo)
    resposta[atributo] = jogo[atributo]

    reply.send(resposta)
})

server.listen({ port: 3000 })