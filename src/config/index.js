import path from "path";

/**
 * Get env variables from running process
 * */
const {
    PORT = 3000,
    MONGO_URI = "mongodb://localhost:27017/myproject",
    JWT_SECRET,
    NODE_ENV = "development",
} = process.env;

/**
 * App core configuration
 * */
const config = {
    all: {
        env: NODE_ENV,
        server: {
            port: PORT,
        },
        router: {
            dir: path.join(__dirname, "../api"),
            options: { prefix: "/api" },
            autoHooks: true,
            // autoHooksPattern: /^[_.]?rbac(\.js|\.cjs|\.mjs)$/i,
        },
        database: {
            uri: MONGO_URI,
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        },
        jwt: {
            secret: JWT_SECRET,
            sign: {
                expiresIn: "10080m", // one week in minutes
                algorithm: "HS512",
            },
            maxSessionCount: 3,
        },
        rateLimiter: {
            max: 1000,
            timeWindow: "1 minute",
        },
        pagination: {
            customLabels: {
                docs: "rows",
                limit: false,
                pagingCounter: false,
                meta: false,
                hasPrevPage: false,
                hasNextPage: false,
            },
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
        qna: {
            endpoint: "testquestions",
            endpointKey: "7d38251e-9cdd-4c1d-a37c-208390a5d16a",
            kbId: "441a2755-3192-481b-99a0-d4f254003c8b",
        },
    },
    test: {
        instance: {
            logger: false,
        },
    },
    development: {
        instance: {
            logger: true,
        },
    },
    production: {
        instance: {
            logger: true,
        },
        rateLimiter: {
            max: 100,
            timeWindow: "1 minute",
        },
    },
};

/**
 * Merge and export configuration
 * */
const mergedConf = Object.assign(config.all, config[config.all.env]);
for (const [key, value] of Object.entries(mergedConf)) {
    module.exports[key] = value;
}

export default mergedConf;
