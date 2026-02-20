import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);

async function dropAllTables() {
  console.log("Dropping all tables...");
  
  await sql.unsafe(`
    DROP TABLE IF EXISTS tracking_history CASCADE;
    DROP TABLE IF EXISTS documents CASCADE;
    DROP TABLE IF EXISTS bookings CASCADE;
    DROP TABLE IF EXISTS car_feature_values CASCADE;
    DROP TABLE IF EXISTS car_features CASCADE;
    DROP TABLE IF EXISTS cars CASCADE;
    DROP TABLE IF EXISTS verifications CASCADE;
    DROP TABLE IF EXISTS accounts CASCADE;
    DROP TABLE IF EXISTS sessions CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS verification CASCADE;
    DROP TABLE IF EXISTS account CASCADE;
    DROP TABLE IF EXISTS session CASCADE;
    DROP TABLE IF EXISTS "user" CASCADE;
    DROP TYPE IF EXISTS user_role CASCADE;
    DROP TYPE IF EXISTS car_status CASCADE;
    DROP TYPE IF EXISTS booking_status CASCADE;
    DROP TYPE IF EXISTS document_type CASCADE;
    DROP SCHEMA IF EXISTS drizzle CASCADE;
  `);
  
  console.log("All tables dropped successfully!");
  await sql.end();
}

dropAllTables();
