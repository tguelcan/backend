import rateLimit from "fastify-rate-limit";
import oas from "fastify-oas";
import sensible from "fastify-sensible";

const loader = async function (app, opts) {
	await app.register(sensible);
	await app.register(rateLimit, {
		max: 1000,
		timeWindow: "1 minute",
	});

	await app.register(oas, {
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
	});
};

export default loader;
