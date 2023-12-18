import { Schema } from "mongoose";

const OrgSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    logo: String,
    onboardingComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default OrgSchema;
