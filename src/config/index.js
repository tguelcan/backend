import path from "path";

/**
 * Get env variables
 * */
const { PORT = 3000, MONGO_URI = "mongodb://localhost:27017/myapp" } =
    process.env;

export default {
    instance: {
        logger: true,
    },
    server: {
        port: PORT,
    },
    router: {
        dir: path.join(__dirname, "../api"),
        options: { prefix: "/api" },
    },
    database: {
        uri: MONGO_URI,
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
        host: "localhost",

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
            consumes: ["application/x-www-form-urlencoded"],
            produces: ["application/x-www-form-urlencoded"],
        },
        exposeRoute: true,
    },
};
