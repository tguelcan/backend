/**
 * Roles
 * @param {app} app instance
 * */
export default (app) =>
	new app.RBAC({
		roles: {
			user: {
				can: [
					"session:find",
					{
						name: "session:delete",
						when: ({ document: { author }, credentials }, done) =>
							done(null, author._id.equals(credentials._id)),
					},
				],
			},
		},
	});
