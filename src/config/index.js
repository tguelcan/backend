import path from "path";

/**
 * Get env variables
 * */
const { PORT = 3000 } = process.env;

export default {
    instance: {
        logger: true,
    },
    server: {
        port: PORT,
    },
    router: {
        dir: path.join(__dirname, "api"),
        options: { prefix: "/api" },
    },
    database: {
        uri: process.env.MONGO_URI || "mongodb://localhost:27017/myapp",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    rateLimiter: {
        max: 1000,
        timeWindow: "1 minute",
    },
    documentation: {
        routePrefix: "/documentation",
        swagger: {
            info: {
                title: "Test openapi",
                description: "testing the fastify swagger api",
                version: "0.1.0",
            },
            externalDocs: {
                url: "https://swagger.io",
                description: "Find more info here",
            },
            consumes: ["application/json"],
            produces: ["application/json"],
        },
        exposeRoute: true,
    },
};
