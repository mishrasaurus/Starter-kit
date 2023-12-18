import mongoose from "mongoose";
import User from "../model/user";
import Org from "../model/org";
import Dashboard from "../model/dashboard";

enum Collection {
  // global
  user = "user",
  org = "org",

  // org
  dashboard = "dashboard",
}

const CollectionSchemaMap = {
  // global
  [Collection.user]: { schema: User, modelName: "User", isGlobal: true },
  [Collection.org]: {
    schema: Org,
    modelName: "Org",
    isGlobal: true,
  },

  // org
  [Collection.dashboard]: {
    schema: Dashboard,
    modelName: "Dashboard",
    isGlobal: false,
  },
};

const isConnected = () => mongoose.connection.readyState === 1;

// to convert _id to id in response
mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
    delete converted.__v;
  },
});

const connectToDB = async ({
  collection,
  orgId,
}: {
  collection: Collection;
  orgId?: string;
}) => {
  mongoose.set("strictQuery", true);

  const getModel = () => {
    const { modelName, schema, isGlobal } =
      CollectionSchemaMap[collection] || {};

    const db = mongoose.connection.useDb(
      isGlobal ? "globalDB" : `orgDB_${orgId}`, // all org level data is stored in org_<orgId> db to separate data between orgs
      {
        useCache: true,
      }
    );

    if (!db || !modelName || !schema) {
      console.log(`
      Invalid arguments passed to connectToDB
      collection: ${collection}
      orgId: ${orgId}
    `);
      return null;
    }

    // Need to register models every time a new connection is created
    if (!db.models[modelName]) {
      db.model(modelName, schema);
    }

    return db.model(modelName) as mongoose.QModel<typeof schema>;
  };

  if (isConnected()) {
    console.log("MongoDB is already connected", collection);
    return getModel();
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URL || "", {
      // @ts-ignore
      useNewUrlParser: true,
      // @ts-ignore
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");

    return getModel();
  } catch (error) {
    console.log(error);
  }

  return null;
};

export { Collection, connectToDB };
