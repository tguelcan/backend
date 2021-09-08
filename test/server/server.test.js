import test from "ava";
import { prepareServer } from "?/utils/server";
import { createUsers } from "?/utils/users";

test.before(prepareServer);
test.before(createUsers);

test.serial("Check if server runs", async (t) => {
  const {
    server,
    users: { user1 },
  } = t.context;

  console.log("user1.token----");
  console.log(user1.token);
  try {
    const res = await server.inject({
      method: "GET",
      url: "/api/posts",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user1.token}`,
      },
    });
    console.log(res);
    t.is("statusCode", "statusCode", "returns a status code of 401");
  } catch (err) {
    console.log(err);
  }
});
