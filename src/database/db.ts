import { PrismaClient } from "@/database/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

/**
 * Database client instance using Prisma ORM.
 *
 * Configured with optimized settings:
 * - Development mode: Logs all database queries, info, warnings, and errors
 * - Production mode: Only logs errors to reduce overhead
 * - Connection pool optimization to prevent memory leaks
 *
 * @type {PrismaClient} Prisma database client instance
 */

const adapter = new PrismaMariaDb({
	host: process.env.DB_URL,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	port: parseInt(process.env.DB_PORT ?? "3306", 10),
});

export const db = new PrismaClient({
	adapter,
	log: process.env.BUILD_ENV === "development" ? ["query", "info", "warn", "error"] : ["error"],
});

/**
 * Establishes a connection to the database.
 *
 * This function should be called during application startup to ensure
 * the database connection is properly established before handling requests.
 *
 * @async
 * @function connect
 * @returns {Promise<void>} A promise that resolves when the connection is established
 * @throws {Error} Throws an error if the connection fails
 */
export async function connect() {
	await db.$connect();
}

/**
 * Gracefully disconnects from the database.
 *
 * This function should be called during application shutdown to ensure
 * all database connections are properly closed and resources are freed.
 *
 * @async
 * @function disconnect
 * @returns {Promise<void>} A promise that resolves when disconnection is complete
 */
export async function disconnect() {
	await db.$disconnect();
}
