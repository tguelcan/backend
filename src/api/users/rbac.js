/**
 * Roles
 * */

export default (app) =>
	new app.RBAC({
		roles: {
			guest: { can: ["*:read"] },
			user: {
				can: ["user:create"],
				inherits: ["guest"],
			},
			admin: { can: ["*"] },
		},
	});
