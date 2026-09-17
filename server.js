import fastify from 'fastify'
const server = fastify()

server.get("/", (request, reply) => {
    
})

server.listen({ port: 3000 })