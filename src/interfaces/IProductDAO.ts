import Product from "../models/Product";

interface IProductDAO {
  GetProducts(): Promise<Product[]>;
}

export default IProductDAO;
