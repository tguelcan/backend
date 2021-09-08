import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";

// Your server
import server from "~/index.js";

// Start MongoDB instance
let requestInstance;

export const prepareServer = async (t) => {
    // Connect Database
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    // Bind
    t.context.mongoConnection = await mongoose.connect(uri);
    t.context.server = server;
};
