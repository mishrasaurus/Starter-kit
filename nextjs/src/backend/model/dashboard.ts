import { Schema } from "mongoose";
import { deletePlugin, modifiedByPlugin } from "@/backend/model/plugins";

const { String: SchemaString, ObjectId } = Schema.Types;

const DashboardSchema = new Schema(
  {
    label: {
      type: SchemaString,
      required: [true, "Label is required."],
    },
    description: {
      type: SchemaString,
    },
  },
  { timestamps: true }
);

DashboardSchema.plugin(deletePlugin);
DashboardSchema.plugin(modifiedByPlugin);

export default DashboardSchema;
