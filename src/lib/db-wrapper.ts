import prisma from "./prisma";

// Database operation wrapper with retry logic
export async function withDatabaseRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;

      // Check if it's a connection pool timeout error
      if (
        error instanceof Error &&
        (error.message.includes("connection pool") ||
          error.message.includes("P2024") ||
          error.message.includes("Timed out"))
      ) {
        console.warn(
          `Database connection attempt ${attempt} failed:`,
          error.message
        );

        if (attempt < maxRetries) {
          // Wait before retrying with exponential backoff
          await new Promise((resolve) => setTimeout(resolve, delay * attempt));
          continue;
        }
      }

      // If it's not a connection error or we've exhausted retries, throw immediately
      throw error;
    }
  }

  throw lastError!;
}

// Enhanced session finder with retry logic
export async function findSessionWithRetry(sessionId: string) {
  return withDatabaseRetry(async () => {
    return await prisma.session.findFirst({
      where: { id: sessionId },
      include: { user: true },
    });
  });
}

// Enhanced user finder with retry logic
export async function findUserWithRetry(userId: string) {
  return withDatabaseRetry(async () => {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  });
}
