/**
 * Roles
 * */

export default (app) =>
	new app.RBAC({
		roles: {
			guest: { can: ["*:read"] },
			user: {
				can: ["post:create"],
				inherits: ["guest"],
			},
			admin: { can: ["*"] },
		},
	});
