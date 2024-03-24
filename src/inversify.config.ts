// inversify.config.ts
import { Container } from "inversify";

import Types from "./configs/Types";

import IProductDAO from "./interfaces/IProductDAO";
import MongoProductRepository from "./repository/MongoProductRepository";
import ProductService from "./services/ProductService";

let container = new Container();
container.bind<IProductDAO>(Types.MongoRepository).to(MongoProductRepository);
container.bind<ProductService>(Types.ProductService).to(ProductService);
export default container;
