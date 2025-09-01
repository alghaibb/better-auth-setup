// Database connection utilities for serverless environments
export function getDatabaseUrl(): string {
  // Use pooled connection for Vercel Postgres in production
  if (process.env.NODE_ENV === "production") {
    return process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL || "";
  }

  // Use direct connection for development
  return process.env.DATABASE_URL || "";
}

export function getConnectionConfig() {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
    log: isProduction
      ? (["error"] as const)
      : (["query", "error", "warn"] as const),
    // Optimize for serverless
    ...(isProduction && {
      transactionOptions: {
        timeout: 5000, // 5 seconds
      },
    }),
  };
}
