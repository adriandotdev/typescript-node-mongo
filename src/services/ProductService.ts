import { inject, injectable } from "inversify";
import IProductDAO from "../interfaces/IProductDAO";
import Types from "../configs/Types";

@injectable()
class ProductService {
  private repository: IProductDAO;

  constructor(@inject(Types.MongoRepository) repository: IProductDAO) {
    this.repository = repository;
  }

  async GetProducts() {
    const products = await this.repository.GetProducts();

    return products;
  }
}

export default ProductService;
