const mongoose = require("mongoose");

const dbUser = process.env.DB_USER || "defaultName";
const dbPassword = process.env.DB_PASS || "";
const host = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT || 27017;
const dbName = process.env.DB_NAME || "viber-bot";

module.exports = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@${host}/${dbName}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log("connection to db!");
  } catch (e) {
    console.error(e); // also let's check your ip-address on MongoDB/Network Access
  }
};
