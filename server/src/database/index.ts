import { connect } from "mongoose";

export const connectDatabase = async () => {
  const dbConnectionString = process.env.DB_CONNECTION_STRING;

  if (!dbConnectionString) throw new Error("Failed to connect the MongoDB");

  try {
    await connect(dbConnectionString);
    console.log("Successfully connected to the MongodDB");
  } catch (error) {
    console.error(error instanceof Error && error.message);
  }
};
