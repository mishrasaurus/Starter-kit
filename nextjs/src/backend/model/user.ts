import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required!"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
    orgId: {
      type: String,
      required: [true, "Organisation is required!"],
      ref: "Org",
    },
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    role: {
      type: String,
      required: [true, "Role is required!"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, converted) {
        const toJSON = mongoose.get("toJSON");
        if (toJSON && typeof toJSON.transform == "function") {
          toJSON.transform(doc, converted, toJSON);
        }
        delete converted.password; // exclude password
      },
    },
  }
);

export default UserSchema;
