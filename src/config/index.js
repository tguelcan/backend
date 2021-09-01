import database from "./db";
import loader from "./loader";

export default {
    database,
    loader,
    db: {
        uri: "mongodb://localhost:27017/testapp",
    },
    server: {
        port: 3000,
    },
};
