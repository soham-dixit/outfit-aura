import mongoose from "mongoose";

const connectToMongo = async () => {
  const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@stealthmode.mggqpgd.mongodb.net/`;

  await mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to Mongo successfully");
    })
    .catch((err) => {
      console.log("Error connecting to Mongo", err);
    });
};

// Check if the mongoose connection is closed if yes then connect again
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
  connectToMongo();
});

// If there is an error in connecting to the database then exit the process
mongoose.connection.on("error", (err) => {
  console.log(`MongoDB connection error: ${err}`);
  connectToMongo();
});

// If the connection is successful then log it
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

export default connectToMongo;
