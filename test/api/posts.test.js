import test from "ava";
import mongoose from "mongoose";
import { prepareServer } from "?/utils/server";
import { createUsers } from "?/utils/users";
import model from "~/api/posts/model";

test.before(prepareServer);
test.before(createUsers);

test.serial.before(async (t) => {
  let doc = await model.create({
    content: "Hallo123",
    author: t.context.users.user1.userId,
  });
  // Convert mongo object into plain object
  t.context.post = {
    ...doc.toObject(),
    _id: doc._id.toString(),
  };
});

const endpoint = "/posts";

// GET 401
test.serial(`GET ${endpoint} | 401`, async (t) => {
  const { server } = t.context;

  const { statusCode, statusMessage } = await server.inject({
    method: "GET",
    url: `/api${endpoint}`,
  });

  t.is(statusCode, 401, "Returns a status code of 401");
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

  t.is(statusCode, 401, "Returns a status code of 401");
  t.is(statusMessage, "Unauthorized", "Returns a Unauthorized status message");
});

// GET 200
test.serial(`GET ${endpoint} | 200 | With one Entry`, async (t) => {
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
      totalDocs: 2,
      offset: 0,
      totalPages: 1,
      page: 1,
      prevPage: null,
      nextPage: null,
    },
    "Check keys"
  );

  t.is(JSON.parse(body).rows.length, 2, "Check length");

  // Check each item in array
  JSON.parse(body).rows.forEach((item) => {
    t.is(typeof item.content, "string");
    t.true(mongoose.isValidObjectId(item._id));
  });
});

// GET ONE 200
test.serial(`GET ${endpoint} | 200 | With two Entries`, async (t) => {
  const {
    server,
    post,
    users: { user1 },
  } = t.context;

  const { statusCode, body } = await server.inject({
    method: "GET",
    url: `/api${endpoint}/${post._id}`,
    headers: {
      authorization: `Bearer ${user1.token}`,
    },
  });

  t.is(typeof JSON.parse(body), "object", "Response is an object");
  t.is(typeof JSON.parse(body).author, "object", "Author is exist in object");
  t.is(statusCode, 200, "Returns a status code of 200");
  t.is(JSON.parse(body).content, "Hallo123", "Returns same value");
});

// PUT ONE 401
test.serial(`PUT ${endpoint} | 401 | Edit one Entry`, async (t) => {
  const {
    server,
    post,
    users: { user2 },
  } = t.context;

  const newContent = "TestMessage2";
  const { statusCode, statusMessage } = await server.inject({
    method: "PUT",
    url: `/api${endpoint}/${post._id}`,
    headers: {
      authorization: `Bearer ${user2.token}`,
    },
    payload: {
      content: newContent,
    },
  });
  t.is(statusCode, 401, "Returns a status code of 401");
  t.is(statusMessage, "Unauthorized", "Returns a Unauthorized status message");
});

// DELETE ONE 401
test.serial(`DELETE ${endpoint} | 401 | Delete one Entry`, async (t) => {
  const {
    server,
    post,
    users: { user2 },
  } = t.context;

  const { statusCode, statusMessage } = await server.inject({
    method: "DELETE",
    url: `/api${endpoint}/${post._id}`,
    headers: {
      authorization: `Bearer ${user2.token}`,
    },
  });
  t.is(statusCode, 401, "Returns a status code of 401");
  t.is(statusMessage, "Unauthorized", "Returns a Unauthorized status message");
});

// PUT EDIT ONE 200
test.serial(`PUT ${endpoint} | 200 | Edit one Entry`, async (t) => {
  const {
    server,
    post,
    users: { user1 },
  } = t.context;

  const newContent = "TestMessage2";
  const { statusCode, body } = await server.inject({
    method: "PUT",
    url: `/api${endpoint}/${post._id}`,
    headers: {
      authorization: `Bearer ${user1.token}`,
    },
    payload: {
      content: newContent,
    },
  });
  t.is(typeof JSON.parse(body), "object", "Response is an object");
  t.is(statusCode, 200, "Returns a status code of 200");
  t.notDeepEqual(JSON.parse(body), post, "Returns not the old value");
  t.is(JSON.parse(body).content, newContent, "Returns same value");
});

// DELETE ONE 204
test.serial(`DELETE ${endpoint} | 204 | Delete one Entry`, async (t) => {
  const {
    server,
    post,
    users: { user1 },
  } = t.context;

  const { statusCode } = await server.inject({
    method: "DELETE",
    url: `/api${endpoint}/${post._id}`,
    headers: {
      authorization: `Bearer ${user1.token}`,
    },
  });
  t.is(statusCode, 204, "Returns a status code of 204");
});
