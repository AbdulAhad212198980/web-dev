import http from "node:http";
import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { realtimeGateway } from "./modules/realtime/realtime.gateway.js";

const app = createApp();
const server = http.createServer(app);
realtimeGateway.attach(server);

server.listen(env.PORT, () => {
  logger.info({ port: env.PORT }, "API server listening");
});
