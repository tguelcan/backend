import path from "path";
import fastify from "fastify";
import autoload from "fastify-autoload";
import config from "~/config";

const { server, db, loader, database } = config;

const { PORT = server.port } = process.env;

const app = fastify({ logger: true });

const start = async () => {
  try {
    // Register Modules
    await loader(app);
    // Register Routes
    await app.register(autoload, {
      dir: path.join(__dirname, "api"),
      options: { prefix: "/api" },
    });

    // Connect to database
    await database(db.uri);

    // Listen Server
    await app.listen(PORT);

    // Log Server informations
    console.log(await app.printRoutes());
    console.log(`Listening at http://localhost:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

// Run server
start();
