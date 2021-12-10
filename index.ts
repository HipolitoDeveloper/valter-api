

import fastify from 'fastify'
import swagger from 'fastify-swagger'
import mongoose from 'mongoose'

import dotenv from 'dotenv'
import UserRoutes from "./src/modules/user/routes/UserRoutes";
import swaggerDocumentation from "./src/modules/common/documentation";

import Passport from 'fastify-passport';
import PassportHTTPBearer from 'passport-http-bearer';
import fastifySecureSession from 'fastify-secure-session';
import AuthService from './src/utils/AuthService'

dotenv.config()

export const app = fastify()

// app.register(fastifyEnv, {
//     schema: EnvironmentSchema,
// }).ready((err) => {
//     if (err) console.error(err);
// });

const { MONGO_CONNECTION,TOKEN_SECRET } = process.env

mongoose.connect( MONGO_CONNECTION || "localconnection")
    .then(result => {
        console.log("MongoDB Conectado")
    })
    .catch(error => {
        console.log("error", error)
    })

// app.register(swagger, swaggerDocumentation);

app.register(fastifySecureSession, {
	key: TOKEN_SECRET || 'teste',
	cookie: {
		path: '/',
	},
});


app.register(Passport.initialize());
app.register(Passport.secureSession());

Passport.use(
	'bearer',
	new PassportHTTPBearer.Strategy(async (token: any, done: any) =>
		AuthService.validateBearerToken(token, done)
	)
);


app.get('/', function (request, reply) {
    reply.send("Our first route")
})

app.register(UserRoutes, { prefix: '/user' });


app.listen(9000, '0.0.0.0', function (err, address) {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening on ${address}`)
})
