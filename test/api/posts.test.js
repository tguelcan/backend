import test from "ava";
import { prepareServer } from "?/utils/server";
import { createUsers } from "?/utils/users";

test.before(prepareServer);
test.before(createUsers);

const endpoint = "/posts";
let onePost;

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

// POST 401
test.serial(`POST ${endpoint} | 401`, async (t) => {
  const { server } = t.context;

  const { statusCode, statusMessage } = await server.inject({
    method: "POST",
    url: `/api${endpoint}`,
    payload: {
      content: "From test",
    },
  });

  t.is(statusCode, 401, "Returns a status code of 200");
  t.is(statusMessage, "Unauthorized", "Returns a Unauthorized status message");
});

// GET 200
test.serial(`GET ${endpoint} | 200 | Without Entry`, async (t) => {
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
  t.deepEqual(
    JSON.parse(body),
    {
      rows: [],
      totalDocs: 0,
      offset: 0,
      totalPages: 1,
      page: 1,
      prevPage: null,
      nextPage: null,
    },
    "Check keys"
  );
});

// POST 200
test.serial(`POST ${endpoint} | 200`, async (t) => {
  const {
    server,
    users: { user1 },
  } = t.context;

  const { statusCode, body } = await server.inject({
    method: "POST",
    url: `/api${endpoint}`,
    headers: {
      authorization: `Bearer ${user1.token}`,
    },
    payload: {
      content: "Testmessage",
    },
  });

  t.is(statusCode, 200, "Returns a status code of 200");
  t.like(
    JSON.parse(body),
    {
      content: "Testmessage",
      author: { displayName: "Tayfun Gülcan" },
    },
    "Check keys"
  );
});

// GET 200 | with entry
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
  t.like(
    JSON.parse(body),
    {
      totalDocs: 1,
      offset: 0,
      totalPages: 1,
      page: 1,
      prevPage: null,
      nextPage: null,
    },
    "Check keys"
  );

  t.is(JSON.parse(body).rows.length, 1, "Check length");

  // assign post
  onePost = JSON.parse(body).rows[0];
});

// GET ONE 200
test.serial(`GET ${endpoint} | 200 | With one Entry`, async (t) => {
  const {
    server,
    users: { user1 },
  } = t.context;

  const { statusCode, body } = await server.inject({
    method: "GET",
    url: `/api${endpoint}/${onePost._id}`,
    headers: {
      authorization: `Bearer ${user1.token}`,
    },
  });
  t.is(typeof JSON.parse(body), "object", "Response is an object");
  t.is(statusCode, 200, "Returns a status code of 200");
  t.deepEqual(JSON.parse(body), onePost, "Returns same value");
});
