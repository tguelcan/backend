import test from "ava";
import mongoose from "mongoose";
import { isEmail } from "validator";
import { prepareServer } from "?/utils/server";
import { createUsers } from "?/utils/users";

test.before(prepareServer);
test.before(createUsers);

const endpoint = "/users";

// GET 401
test.serial(`GET ${endpoint} | 404`, async (t) => {
	const { server } = t.context;

	const { statusCode } = await server.inject({
		method: "GET",
		url: `/api${endpoint}`,
	});

	t.is(statusCode, 404, "Returns a status code of 404");
});

// GET 200
test.serial(`GET ${endpoint} | 200`, async (t) => {
	const {
		server,
		users: { user1 },
	} = t.context;

	const { statusCode, body } = await server.inject({
		method: "GET",
		url: `/api${endpoint}/me`,
		headers: {
			authorization: `Bearer ${user1.token}`,
		},
	});

	t.is(statusCode, 200, "Returns a status code of 10");
	t.is(JSON.parse(body).displayName, user1.displayName, "Check displayName");
	t.is(JSON.parse(body).email, user1.email, "Check email");
});

// Check stored microsoft user
test.serial(`Check microsoft user is stored`, async (t) => {
	const {
		users: { user1 },
	} = t.context;

	t.true(isEmail(user1.email));
	t.true(mongoose.isValidObjectId(user1._id));
	t.is(user1.service, "microsoft");
	t.is(typeof user1.token, "string");
});

// Check stored google user
test.serial(`Check google user is stored`, async (t) => {
	const {
		users: { user2 },
	} = t.context;

	t.true(isEmail(user2.email));
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
