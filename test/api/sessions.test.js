import test from "ava";
import mongoose from "mongoose";
import { random } from "lodash";

import { prepareServer } from "?/utils/server";
import { createUsers } from "?/utils/users";

import sessionModel from "~/api/sessions/model";
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
  JSON.parse(body).rows.forEach((item) => {
    t.is(item.jwtid, "123456");
    t.true(mongoose.isValidObjectId(item._id));
  });
});

// Create Sessions
test.serial(`Create more sessions`, async (t) => {
  const {
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
    await sessionModel.createAndtruncateSessions({
      jwtid: random(3000, 5000).toString(4),
      author: user1.userId,
      maxSessionCount: jwt.maxSessionCount,
    });
  } while (i < jwt.maxSessionCount + 2);

  const userSessions = await sessionModel.find({ author: user1.userId });
  const userSessionsCount = await sessionModel.countDocuments({
    author: user1.userId,
  });

  t.is(userSessionsCount, jwt.maxSessionCount);

  userSessions.forEach((item) => {
    t.is(typeof item.jwtid, "string");
    t.true(mongoose.isValidObjectId(item._id));
  });
  //
});

// DELETE ONE 401
test.only(`DELETE ${endpoint} | 401 | Delete one Entry`, async (t) => {
  const {
    server,
    users: { user1, user2 },
  } = t.context;

  const getAnotherSession = await sessionModel.findOne({
    author: user2.userId,
  });

  const { statusCode } = await server.inject({
    method: "DELETE",
    url: `/api${endpoint}/${getAnotherSession._id}`,
    headers: {
      authorization: `Bearer ${user1.token}`,
    },
  });
  t.is(statusCode, 401, "Returns a status code of 401");
});
