import test from "ava";
import mongoose from "mongoose";

import { prepareServer } from "?/utils/server";
import { createUsers } from "?/utils/users";

import User from "~/api/users/model";
import { jwt } from "~/config";

test.before(prepareServer);
test.before(createUsers);

const endpoint = "/users";

// GET 401
test.serial(`GET ${endpoint} | 401`, async (t) => {
	const { server } = t.context;

	const { statusCode, statusMessage } = await server.inject({
		method: "GET",
		url: `/api${endpoint}`,
	});

	t.is(statusCode, 401, "Returns a status code of 200");
	t.is(
		statusMessage,
		"Unauthorized",
		"Returns a Unauthorized status message"
	);
});

// Check stored user
test.serial(`Check microsoft user is stored`, async (t) => {
	const {
		server,
		users: { user1 },
	} = t.context;

	t.true(t.context.isMail(user1.email));
	t.true(mongoose.isValidObjectId(user1._id));
	t.is(user1.service, "microsoft");
	t.is(typeof user1.token, "string");
});
test.serial(`Check google user is stored`, async (t) => {
	const {
		server,
		users: { user2 },
	} = t.context;

	t.true(t.context.isMail(user2.email));
	t.true(mongoose.isValidObjectId(user2._id));
	t.is(user2.service, "google");
	t.is(typeof user2.token, "string");
});

// Check JWT
test.serial(`Check JWT`, async (t) => {
	const {
		server,
		users: { user1 },
	} = t.context;

	const { role, jwtid, _id } = server.jwt.decode(user1.token);

	t.is(role, "user");
	t.is(jwtid, "123456");
	t.true(mongoose.isValidObjectId(_id));
});
