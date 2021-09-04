import fp from "fastify-plugin";
import RBAC from "fast-rbac";

/**
 * Define RBAC Plugin
 * DOC: https://github.com/SkeLLLa/fast-rbac#docs
 * */
const plugin = async (server, { uri, options }, next) => {
	// Decorate RBAC
	server.decorate("RBAC", RBAC);

	next();
};

export default fp(plugin, {
	fastify: "3.x",
	name: "rbac",
});
