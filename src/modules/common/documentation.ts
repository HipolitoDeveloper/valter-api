import { SwaggerOptions } from 'fastify-swagger';
import {UserModel} from "../user/UserModel";
import {UserInterface} from "../user/schemas/User";

const swaggerDocumentation: SwaggerOptions = {
    routePrefix: '/documentation',
    openapi: {
        components: {
            securitySchemes: {
                Bearer: {
                    type: 'http',
                    scheme: 'bearer',
                },
            },
        },
    },
    swagger: {
        info: {
            title: 'Trackage Maestro API',
            version: '0.30',
        },
        host: 'localhost:9000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            { name: 'user', description: 'User related endpoints' },
            // { name: 'client', description: 'Client related endpoints' },
            // { name: 'profile', description: 'Profile related endpoints' },
        ],
        definitions: {
            User: UserInterface,
            // Invite: InviteSchema,
            // Client: ClientSchema,
            // Profile: ProfileSchema,
        },
        securityDefinitions: {
            jwtToken: {
                description: 'Authorization header token, example: "Bearer ###TOKEN###"',
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
            },
        },
    },
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
    },
    uiHooks: {
        preHandler: function (request, reply, next) {
            next();
        },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true,
};

export default swaggerDocumentation;
