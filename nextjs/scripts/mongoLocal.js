(function () {
  const globalDBName = "globalDB"; // change the name of the global database here and in backend/mongo.ts
  const globalDB = connect(`mongodb://127.0.0.1:27017/${globalDBName}`);

  // create two collections in the global database - orgs and users
  // orgs will contain your tenant information and users will contain your user information
  // change the name of the collections here

  const orgCollectionName = "orgs";
  print(`Creating ${orgCollectionName} collection in ${globalDBName}`);
  globalDB.createCollection(orgCollectionName);
  print(`${orgCollectionName} created in ${globalDBName}`);

  const userCollectionName = "users";
  print(`Creating ${userCollectionName} collection in ${globalDBName}`);
  globalDB.createCollection(userCollectionName);
  print(`${userCollectionName} created in ${globalDBName}`);

  const now = new Date().toISOString();

  const { insertedId: orgId, acknowledged } = globalDB[
    orgCollectionName
  ].insertOne({
    name: "Dev",
    onboardingComplete: false,
    createdAt: now,
    updatedAt: now,
  });

  if (!acknowledged) {
    throw new Error(`Could not add document in ${orgCollectionName}`);
  }

  const username = "admin";
  const password = "admin";
  const { insertedId: userId, acknowledged: userAcknowledged } = globalDB[
    userCollectionName
  ].insertOne({
    username,
    password,
    orgId,
    role: "admin",
    name: "Admin",
    createdAt: now,
    updatedAt: now,
  });

  if (!userAcknowledged) {
    throw new Error(`Could not add document in ${userCollectionName}`);
  }

  print(
    `Created ${orgCollectionName} with id ${orgId} and ${userCollectionName} with id ${userId} with username:password ${username}:${password}`
  );
})();
