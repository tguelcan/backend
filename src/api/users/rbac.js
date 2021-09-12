/**
 * Roles
 * @param {app} app instance
 * */
export default (app) =>
	new app.RBAC({
		roles: {
			user: {
				can: ["user:findMe"],
			},
			admin: { can: ["*"] },
		},
	});
