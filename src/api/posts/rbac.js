/**
 * Roles
 * @param {app} app instance
 * */
export default (app) =>
	new app.RBAC({
		roles: {
			guest: {
				can: ["post:find"],
			},
			user: {
				can: [
					"post:findOne",
					"post:createOne",
					"post:updateOne",
					"post:deleteOne",
				],
				inherits: ["guest"],
			},
			admin: {
				can: ["post:*"],
				inherits: ["user"],
			},
		},
	});
