const dotenv = require("dotenv");
dotenv.config(); // Must be at the top

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Create 40 users with hashed passwords
const generateUsers = async () => {
  const users = [];
  for (let i = 1; i <= 40; i++) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(`team${i}pass`, salt);
    users.push({
      name: `Team Member ${i}`,
      email: `team${i}@example.com`,
      password: hashedPassword,
      role: "team",
    });
  }
  return users;
};

const seedUsers = async () => {
  try {
    await User.deleteMany({});
    console.log("🧹 Cleared existing users");

    const users = await generateUsers();
    await User.insertMany(users);

    console.log("✅ 40 team users inserted successfully!");
  } catch (err) {
    console.error("❌ Error while seeding users:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedUsers();
