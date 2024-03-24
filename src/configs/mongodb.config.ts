import { MongoClient } from 'mongodb';
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@myatlasclusteredu.1mtwqh7.mongodb.net/?retryWrites=true&w=majority&appName=myAtlasClusterEDU`

const client = new MongoClient(uri);

(async function run() {

    try {
        await client.connect();

        console.log("Connected to MongoDB database");
    }
    catch (err) {
        console.log(err);
    }
})();

export default client;

