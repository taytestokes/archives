import "dotenv/config";

import buildServer from "./server";

const server = buildServer();

server.listen({ port: Number(process.env.PORT), host: "0.0.0.0" }, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log(`Server ready on port: ${process.env.PORT}!`);
});
