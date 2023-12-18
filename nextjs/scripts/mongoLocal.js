const client = connect("mongodb://127.0.0.1:27017");

globalDB = client.useDb("globalDB"); // change the name of the global database here and in backend/mongo.ts

// create two collections in the global database - orgs and users
// orgs will contain your tenant information and users will contain your user information
// change the name of the collections here
globalDB.createCollection("orgs");
globalDB.createCollection("users");

const now = new Date().toISOString();

const { insertedId: orgId, acknowledged } = db.orgs.insertOne({
  name: "Dev",
  onboardingComplete: false,
  createdAt: now,
  updatedAt: now,
});

if (!acknowledged) {
  throw new Error("Could not create org");
}

const username = "admin";
const password = "admin";
const { insertedId: userId, acknowledged: userAcknowledged } =
  db.users.insertOne({
    username,
    password,
    orgId,
    role: "admin",
    name: "Admin",
    createdAt: now,
    updatedAt: now,
  });

if (!userAcknowledged) {
  throw new Error("Could not create user");
}

print(
  `Created org with id ${orgId} and user with id ${userId} with username:password ${username}:${password}`
);
