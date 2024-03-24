import "reflect-metadata";
import app from "./app";

import Logger from "./configs/Logger.config";

const PORT = process.env.PORT || 4001;

const logger = new Logger();

app.listen(PORT, () => {
  logger.info({
    SERVER_LISTENING: {
      port: PORT,
      message: "SUCCESS",
    },
  });
});
