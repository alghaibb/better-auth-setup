import { NextResponse } from "next/server";
import { checkDatabaseConnection } from "@/lib/db-health";

export async function GET() {
  try {
    const dbHealth = await checkDatabaseConnection();
    
    if (dbHealth.status === "healthy") {
      return NextResponse.json(
        { 
          status: "ok", 
          database: dbHealth,
          timestamp: new Date().toISOString()
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { 
          status: "error", 
          database: dbHealth,
          timestamp: new Date().toISOString()
        },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json(
      { 
        status: "error", 
        message: "Health check failed",
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
