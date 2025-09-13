import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as typeof globalThis & {
  prisma?: PrismaClient;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
    datasources: {
      db: {
        url:
          process.env.DATABASE_URL +
          "&connection_limit=5&pool_timeout=10&idle_timeout=5",
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
