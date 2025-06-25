import mongoose from "mongoose";

const MONGODB_url = process.env.MONGODB_URI!;
if (!MONGODB_url) {
  throw new Error("pl define mongodburl");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function coonectDB() {
  //Already connected
  if (cached.conn) {
    return cached.conn;
  }
  //case 2 when previous req sent connection request but not back yet

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };

    cached.promise = mongoose
      .connect(MONGODB_url, opts)
      .then(() => mongoose.connection);
  }

  //Wait for db connection
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
