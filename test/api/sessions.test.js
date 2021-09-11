import test from "ava";
import mongoose from "mongoose";

import { prepareServer } from "?/utils/server";
import { createUsers } from "?/utils/users";

import Session from "~/api/sessions/model";
import { jwt } from "~/config";

test.before(prepareServer);
test.before(createUsers);

const endpoint = "/sessions";

// GET 401
test.serial(`GET ${endpoint} | 401`, async (t) => {
  const { server } = t.context;

  const { statusCode, statusMessage } = await server.inject({
    method: "GET",
    url: `/api${endpoint}`,
  });

  t.is(statusCode, 401, "Returns a status code of 200");
  t.is(statusMessage, "Unauthorized", "Returns a Unauthorized status message");
});

// GET 200
test.serial(`GET ${endpoint} | 200 | With Entry`, async (t) => {
  const {
    server,
    users: { user1 },
  } = t.context;

  const { statusCode, body } = await server.inject({
    method: "GET",
    url: `/api${endpoint}`,
    headers: {
      authorization: `Bearer ${user1.token}`,
    },
  });

  t.is(typeof JSON.parse(body), "object", "Response is an object");
  t.is(statusCode, 200, "Returns a status code of 200");

  // Check each item in array
  JSON.parse(body).forEach((item) => {
    t.is(item.jwtid, "123456");
    t.true(mongoose.isValidObjectId(item._id));
  });
});

// Create Sessions
test.serial(`Create more sessions`, async (t) => {
  const {
    server,
    users: { user1 },
  } = t.context;

  /**
   * Create more then jwt.maxSessionCount
   * defined and check if only 3 sessions stored.
   * Generate randome jwtid for testing
   * */
  let i = 1;
  do {
    i++;
    await Session.createAndtruncateSessions({
      jwtid: (Math.random() + 1).toString(36).substring(3),
      author: user1.userId,
      maxSessionCount: jwt.maxSessionCount,
    });
  } while (i < jwt.maxSessionCount + 2);

  const userSessions = await Session.find({ author: user1.userId });
  const userSessionsCount = await Session.countDocuments({
    author: user1.userId,
  });

  t.is(userSessionsCount, jwt.maxSessionCount);

  userSessions.forEach((item) => {
    t.is(typeof item.jwtid, "string");
    t.true(mongoose.isValidObjectId(item._id));
  });
  //
});
