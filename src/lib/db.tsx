import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as typeof globalThis & {
  prisma?: PrismaClient;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL + "&connection_limit=20&pool_timeout=60",
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
