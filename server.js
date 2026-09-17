import fastify from 'fastify'
import games from "./games.json" with {type: 'json'}

const server = fastify()

server.get("/jogos", (request, reply) => {
    let resposta
    const { dataMaior, dataLancamento } = request.query

        if (dataMaior == "true"){
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
            resposta = games.games
            .map(g => g.titulo)
        }

    reply.send(resposta)
})

server.listen({ port: 3000 })