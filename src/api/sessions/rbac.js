/**
 * Roles
 * @param {app} app instance
 * */
export default (app) =>
	new app.RBAC({
		roles: {
			user: {
				can: ["session:find", "session:deleteOne", "session:deleteAll"],
			},
		},
	});
