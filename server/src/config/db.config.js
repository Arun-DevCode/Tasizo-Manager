import mongoose from "mongoose"; // ODM : Object Data Modeling

async function DBConnection() {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://arun:pgWSmnsLyNALu2Ab@cluster0.ynk007h.mongodb.net/LocalDB?appName=Cluster0",
    );

    return connection;
  } catch (error) {
    return process.exit(1);
  }
}

export default DBConnection;
