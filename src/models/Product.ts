import { ProductCategory } from "../utils/Enums";

class Product {
  private name: String;
  private category: ProductCategory;
  private price: Number;

  constructor(name: String, category: ProductCategory, price: Number) {
    this.name = name;
    this.category = category;
    this.price = price;
  }

  public toString(): Object {
    return {
      name: this.name,
      category: this.category,
      price: this.price,
    };
  }
}

export default Product;
