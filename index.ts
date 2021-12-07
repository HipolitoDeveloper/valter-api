

import fastify from 'fastify'
import swagger from 'fastify-swagger'
import mongoose from 'mongoose'

import dotenv from 'dotenv'
// import UserRoutes from "./src/modules/user/routes/UserRoutes";
// import swaggerDocumentation from "./src/modules/common/documentation";
dotenv.config()

export const app = fastify()

// app.register(fastifyEnv, {
//     schema: EnvironmentSchema,
// }).ready((err) => {
//     if (err) console.error(err);
// });


mongoose.connect('mongodb://valter:valterpwd@database_valter/valter_test?retryWrites=true&writeConcern=majority')
    .then(result => {
        console.log("MongoDB Conectado")
    })
    .catch(error => {
        console.log("error", error)
    })

// app.register(swagger, swaggerDocumentation);


app.get('/', function (request, reply) {
    reply.send("Our first route")
})

// app.register(UserRoutes, { prefix: '/user' });

app.listen(9000, '0.0.0.0', function (err, address) {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening on ${address}`)
})
