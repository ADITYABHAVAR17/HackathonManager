// File: backend/seed.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Problem = require("./models/Problem");
const User = require("./models/User");
dotenv = require("dotenv");
dotenv.config();

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB for seeding..."))
  .catch((err) => console.error("Connection error:", err));

// Domains and tags for problems
const domains = [
  "Algorithm",
  "Data Structure",
  "Web Development",
  "Database",
  "System Design",
  "Machine Learning",
];
const tags = [
  "Array",
  "String",
  "Tree",
  "Graph",
  "Dynamic Programming",
  "Sorting",
  "Searching",
  "React",
  "Node.js",
  "MongoDB",
  "SQL",
  "Python",
  "JavaScript",
];

// Generate random problems
const generateProblems = () => {
  const problems = [];
  for (let i = 1; i <= 30; i++) {
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const randomTags = [];
    const numTags = Math.floor(Math.random() * 3) + 1; // 1-3 tags
    for (let j = 0; j < numTags; j++) {
      const tag = tags[Math.floor(Math.random() * tags.length)];
      if (!randomTags.includes(tag)) randomTags.push(tag);
    }

    problems.push({
      title: `Problem ${i}: ${randomDomain} Challenge`,
      description: `This is a detailed description for problem ${i} in the ${randomDomain} domain. The problem involves ${randomTags.join(
        ", "
      )} and tests your understanding of core concepts.`,
      domain: randomDomain,
      difficulty: ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)],
      tags: randomTags,
    });
  }
  return problems;
};

// Generate users with different roles
const generateUsers = async () => {
  const users = [];

  // Generate 10 admins

  // Generate 10 judges

  // Generate 10 teams
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

// Seed the database
const seedDB = async () => {
  try {
    // Clear existing data
    await Problem.deleteMany({});
    await User.deleteMany({});
    console.log("Database cleared");

    // Insert new data
    const problems = generateProblems();
    const users = await generateUsers();

    await Problem.insertMany(problems);
    await User.insertMany(users);

    console.log("Database seeded successfully!");
    console.log(
      `Inserted ${problems.length} problems and ${users.length} users`
    );
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
