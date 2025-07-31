// backend/seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");

const Problem = require("./models/Problem");
const User = require("./models/User");
const Hackathon = require("./models/Hackathon");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const difficulties = ["Easy", "Medium", "Hard"];
const domains = ["Fintech", "Healthcare", "AI", "Edtech"];
const problemTypes = ["Coding", "Idea Submission", "Prototype", "Presentation"];

const seedProblems = async () => {
  try {
    let users = await User.find({});
    let hackathons = await Hackathon.find({});

    // If no user, create one dummy user
    if (users.length === 0) {
      const newUser = new User({
        name: "Dummy User",
        email: "dummy@example.com",
        password: "password123", // Will be hashed by pre-save hook
        role: "admin",
      });
      await newUser.save();
      users = [newUser];
      console.log("✅ Dummy user created.");
    }

    // If no hackathon, create one dummy hackathon
    if (hackathons.length === 0) {
      const newHackathon = new Hackathon({
        name: "Dummy Hackathon",
        theme: "Innovation for Good",
        startDate: faker.date.recent(5),
        endDate: faker.date.soon(10),
      });
      await newHackathon.save();
      hackathons = [newHackathon];
      console.log("✅ Dummy hackathon created.");
    }

    const problems = [];

    for (let i = 0; i < 30; i++) {
      const problem = {
        title: faker.company.catchPhrase(),
        description: faker.lorem.paragraphs(2),
        domain: faker.helpers.arrayElement(domains),
        difficulty: faker.helpers.arrayElement(difficulties),
        tags: faker.helpers.arrayElements(["web", "ai", "nlp", "ml", "design"], 3),

        inputFormat: "Input will be provided as standard input.",
        outputFormat: "Output should match expected output format exactly.",
        constraints: `Execution time < ${faker.number.int({ min: 1, max: 5 })} seconds`,
        sampleInput: JSON.stringify({ data: faker.lorem.words(3) }, null, 2),
        sampleOutput: JSON.stringify({ result: faker.word.adjective() }, null, 2),

        testCases: [
          {
            input: "2 4",
            output: "6",
            isPublic: true,
          },
          {
            input: "10 5",
            output: "15",
            isPublic: false,
          },
        ],

        evaluationCriteria: {
          innovation: 30,
          technicalComplexity: 30,
          usability: 20,
          impact: 20,
        },

        problemType: faker.helpers.arrayElement(problemTypes),

        hackathonId: faker.helpers.arrayElement(hackathons)._id,
        author: faker.helpers.arrayElement(users)._id,

        isActive: true,
        startDate: faker.date.recent(5),
        endDate: faker.date.soon(15),

        totalSubmissions: faker.number.int({ min: 0, max: 300 }),
        acceptedSubmissions: faker.number.int({ min: 0, max: 50 }),

        createdAt: new Date(),
        updatedAt: new Date(),
      };

      problems.push(problem);
    }

    await Problem.insertMany(problems);
    console.log("✅ 30 problems seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding problems:", err);
    process.exit(1);
  }
};

seedProblems();
