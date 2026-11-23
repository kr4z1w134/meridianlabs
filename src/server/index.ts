import express from "express";
import { createServer } from "http";
import winston from "winston";
import { apiRouter } from "./routes/api";
import { authMiddleware } from "./middleware/auth";
import { prisma } from "./db/prisma";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

const app = express();
const port = parseInt(process.env.PORT || "3001", 10);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", authMiddleware, apiRouter);

app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "healthy", version: process.env.npm_package_version });
  } catch {
    res.status(503).json({ status: "degraded", db: "unreachable" });
  }
});

const server = createServer(app);

server.listen(port, () => {
  logger.info(`Meridian API listening on port ${port}`);
});

process.on("SIGTERM", async () => {
  logger.info("SIGTERM received, draining connections");
  server.close();
  await prisma.$disconnect();
  process.exit(0);
});
