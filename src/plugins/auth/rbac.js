import fp from "fastify-plugin";

/**
 * Define Server Plugin
 * @param {server} server instance
 * @param {uri, options} server options
 * @param {next} next pass
 * */
const plugin = async (server, { uri, options }, next) => {
	// JWT Authentication helper
	server.decorate(
		"authenticate",
		(acl, model, action) => async (request, reply) => {
			try {
				await request.jwtVerify();

				if (acl) {
					server.assert(
						model || action,
						401,
						"Not Model or Action defined"
					);
					const userRole = acl(server);
					const {
						user: { role },
					} = request;
					server.assert(userRole.can(role, action, model), 401);
				}
			} catch (err) {
				reply.send(err);
			}
		}
	);

	server.decorate(
		"addAuthor",
		(key = "author") =>
			async (request, reply) =>
				Object.assign(request.body, {
					[key]: request.user._id,
				})
	);
	server.decorate(
		"populate",
		(
				fields = {
					path: "author",
					select: "displayName picture",
				}
			) =>
			async (request, reply, payload, done) =>
				payload.populate(fields)
	);

	next();
};

export default fp(plugin, {
	fastify: "3.x",
	name: "authenticate",
});
