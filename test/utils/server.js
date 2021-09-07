import mongoose from "mongoose";
import request from "supertest";

import { MongoMemoryServer } from "mongodb-memory-server";

// Your server
import { serve } from "~/index.js";

// Start MongoDB instance
let requestInstance;

export const prepareServer = async (t) => {
    // Connect Database
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    t.context.mongoConnection = await mongoose.connect(uri);
    // Connect Server
    t.context.server = serve;

    // requestInstance = await request(t.context.server.listener);
    // t.context.request = requestInstance;
};
