import { Schema } from "mongoose";
import mongooseDelete from "mongoose-delete";

const deletePlugin = function (schema: Schema) {
  schema.plugin(mongooseDelete, {
    deletedAt: true,
    deletedBy: true,
    overrideMethods: true,
  });
};

export default deletePlugin;
