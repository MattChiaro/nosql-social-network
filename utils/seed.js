const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { usernames, emails } = require('./data');

connection.on('error', (err) => console.error(err));

connection.once('open', async () => {
  console.log('Connected to the database');

  // Clear existing data
  await Thought.deleteMany({});
  await User.deleteMany({});

  // Create users
  const users = [];
  for (let i = 0; i < 10; i++) {
    users.push({
      username: usernames[i],
      email: emails[i],
    });
  }
  await User.insertMany(users);
  console.log('Users seeded successfully');

  // Create thoughts for each user
  for (let i = 0; i < 10; i++) {
    const user = users[i];
    const thoughts = [];
    const numThoughts = Math.floor(Math.random() * 3) + 3; // Random number of thoughts between 3 and 5

    for (let j = 0; j < numThoughts; j++) {
      thoughts.push({
        thoughtText: `Thought ${j + 1} by ${user.username}`,
        username: user.username,
        reactions: [], // Empty reactions array for now
      });
    }

    await Thought.insertMany(thoughts);
    console.log(`Thoughts seeded successfully for user ${user.username}`);
  }

  console.log('Seeding complete!');
  process.exit(0);
});
