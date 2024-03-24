import { Express, Request, Response } from "express";
import Logger from "../configs/Logger.config";

import ProductService from "../services/ProductService";
import Types from "../configs/Types";
import { injectable, inject } from "inversify";

@injectable()
class ProductAPI {
  private logger: Logger;

  private service: ProductService;

  constructor(
    app: Express,
    @inject(Types.ProductService) service: ProductService
  ) {
    this.logger = new Logger();

    this.service = service;

    this.initializeAPIs(app);
  }

  private initializeAPIs(app: Express) {
    app.get("/api/v1/products", [], async (req: Request, res: Response) => {
      try {
        const result = await this.service.GetProducts();

        return res
          .status(200)
          .json({ status: 200, data: result, message: "Success" });
      } catch (err: any) {
        this.logger.error({
          GET_PRODUCTS: {
            err,
          },
        });

        return res.status(err.status || 500).json({
          status: err.status || 500,
          message: err.message || "Internal Server Error",
          data: err.data || [],
        });
      } finally {
        this.logger.info({
          END_OF_REQUEST: {
            protocol: req.protocol,
            url: req.url,
            message: "SUCCESS",
          },
        });
      }
    });
  }
}

export default ProductAPI;
