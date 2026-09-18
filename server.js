import fastify   from 'fastify'
import { supabase }  from './database.js'
import cors      from "@fastify/cors"
import games     from "./games.json" with {type: 'json'}

const server = fastify()

await server.register(cors, {
    origin: "http://127.0.0.1:5500"
})

// Rota POST Para a Tabela JOGOS (Insert Games)
server.post("/database", async (request, reply) => {
    const { titulo, 
            preco, 
            plataforma, 
            anoLancamento, 
            faixaEtaria, 
            genero, 
            desenvolvedora, 
            isMultiplayer } = request.body

    const { data, error } = await supabase
    .from("JOGOS")
    .insert({
        nm_titulo:         titulo,
        vl_preco:          preco,
        nm_plataforma:     plataforma,
        dt_ano_lancamento: anoLancamento,
        nm_faixa_etaria:   faixaEtaria,
        nm_genero:         genero,
        nm_desenvolvedora: desenvolvedora,
        is_multiplayer: isMultiplayer
    })
    .select()

    // Caso de Erro
    if(error)
        return reply
        .status(500)
        .send({ status: "error", detalhe: error.message })
    
    // Respota Retornada
    return reply
    .status(201)
    .send({ status: "Jogo Criado", dados: data })
})

// server.get("/database", async (request, reply) => {
//     const { data, error } = await supabase.from("usuario").select("*")
//     if(error)
//         return reply.status(500).send({status: "erro", detalhe: error.message})

//     return {status: "conectado", dados: data}
// })

// server.get("/jogos", (request, reply) => {
//     let resposta
//     const { dataMaior, dataLancamento, titulo } = request.query

//         if(titulo){
//             resposta = games.games
//             .filter(g => g.titulo == titulo)
//             .map(g => g)
//         }
//         else if (dataMaior == "true"){
//             // Buscar Datas de Lancamento
//             resposta = games.games
//             .filter(g => g.ano_lancamento > Number(dataLancamento))
//             .map(g => g.titulo)
//         } else if(dataMaior == "false"){
//             resposta = games.games
//             .filter(g => g.ano_lancamento < Number(dataLancamento))
//             .map(g => g.titulo)
//         } else if(dataLancamento){
//             resposta = games.games
//             .filter(g => g.ano_lancamento == Number(dataLancamento))
//             .map(g => g.titulo)
//         } else {
//         resposta = games.games.map(g => g.titulo)
//     }

//     if (!resposta){
//         return reply.status(404).send({mensagem: "Nada Encontrado, Verifique o EndPoint da API"})
//     }
    
//     reply.send(resposta)
// })

// server.get("/jogos/:titulo", (request, reply) => {
//     const { titulo } = request.params
//     const { atributo } = request.query
//     let resposta = {
//         titulo,
//     }
//     const jogo = games.games.find(g => g.titulo == titulo)
//     resposta[atributo] = jogo[atributo]

//     reply.send(resposta)
// })

server.listen({ port: 3000 })