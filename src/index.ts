import "dotenv/config";
import config from "config";

import buildServer from "./server";

const server = buildServer();

server.listen({ port: config.get("port"), host: "0.0.0.0" }, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log(`Server ready on port: ${config.get("port")}!`);
});
