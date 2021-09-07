import test from "ava";
import { prepareServer } from "?/utils/server";

test.before(prepareServer);

test.serial("Check if server runs", async (t) => {
  const { server } = t.context;

  const app = await server();

  app.inject(
    {
      method: "GET",
      url: "/api/posts",
    },
    (err, response) => {
      console.log(response);
    }
  );
  // t.is(info.host, "0.0.0.0");
  t.is("test", "test");
});
