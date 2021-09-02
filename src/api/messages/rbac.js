/**
 * Roles
 * */

export default (app) =>
	new app.RBAC({
		roles: {
			guest: { can: ["*:read"] },
			user: {
				can: ["message:create"],
				inherits: ["guest"],
			},
			admin: { can: ["*"] },
		},
	});
