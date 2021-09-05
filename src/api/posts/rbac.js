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
					"post:create",
					{
						name: "post:update",
						when: ({ document: { author }, credentials }, done) =>
							done(null, author._id.equals(credentials._id)),
					},
					{
						name: "post:delete",
						when: ({ document: { author }, credentials }, done) =>
							done(null, author._id.equals(credentials._id)),
					},
				],
				inherits: ["guest"],
			},
			admin: {
				can: ["post:*"],
				inherits: ["user"],
			},
		},
	});
