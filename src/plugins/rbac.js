import fp from "fastify-plugin";
import RBAC from "fast-rbac";

/**
 * Define RBAC Plugin
 * DOC: https://github.com/SkeLLLa/fast-rbac#docs
 * */
const plugin = async (fastify, { uri, options }, next) => {
	// Decorate RBAC
	fastify.decorate("RBAC", RBAC);

	next();
};

export default fp(plugin, {
	fastify: "3.x",
	name: "rbac",
});
