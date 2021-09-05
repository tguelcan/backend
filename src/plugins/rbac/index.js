import fp from "fastify-plugin";
import RBAC from "fast-rbac";

/**
 * Define RBAC Plugin
 * DOC: https://github.com/SkeLLLa/fast-rbac#docs
 * @param {server} server instance
 * @param {options} server options
 * @param {next} next pass
 * */
const plugin = async (server, options, next) => {
	// Decorate RBAC
	server.decorate("RBAC", RBAC);

	next();
};

export default fp(plugin, {
	fastify: "3.x",
	name: "rbac",
});
