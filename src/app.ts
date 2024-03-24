import env from "dotenv";

env.config();

import express, { Express } from "express";
import helmet from "helmet";

// APIs
import ProductAPI from "./apis/product.api";
import ProductService from "./services/ProductService";

// Utils
import container from "./inversify.config";
import Types from "./configs/Types";
import Logger from "./configs/Logger.config";

const app: Express = express();

app.use(helmet());
app.use(helmet.frameguard({ action: "deny" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const logger = new Logger();
new ProductAPI(app, container.get<ProductService>(Types.ProductService));

app.use("*", (req, res, next) => {
  logger.error({
    API_NOT_FOUND: {
      path: req.url,
    },
  });

  return res.status(404).json({ status: 404, message: "API Not Found" });
});

export default app;
