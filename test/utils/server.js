import { MongoMemoryServer } from "mongodb-memory-server";

// Your server
import server from "~/index.js";

// Start MongoDB instance
let requestInstance;

export const prepareServer = async (t) => {
    // Connect Database
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    // Bind to context
    t.context.mongoConnection = await server.mongoose.connect(uri);
    t.context.server = server;
};
