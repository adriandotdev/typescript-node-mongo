import { MongoClient, Collection, Document } from "mongodb";
import mongodb from "../configs/mongodb.config";
import IProductDAO from "../interfaces/IProductDAO";
import Product from "../models/Product";
import { injectable } from "inversify";

@injectable()
class MongoProductRepository implements IProductDAO {
  private mongodb: MongoClient;
  private collection: Collection<Document>;

  constructor() {
    this.mongodb = mongodb;

    this.collection = this.mongodb
      .db(process.env.DB_NAME)
      .collection("products");
  }

  async GetProducts(): Promise<Product[]> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.mongodb.connect();

        let result = await this.collection.find().toArray();

        const products: Product[] = result.map((product) => {
          return new Product(product.name, product.category, product.price);
        });

        resolve(products);
      } catch (err) {
        reject(err);
      } finally {
        this.mongodb.close();
      }
    });
  }
}

export default MongoProductRepository;
