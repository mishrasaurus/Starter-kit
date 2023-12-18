/* 
This pluging sets createdBy and updatedBy field in the schema
to use it set pass userId in "modifiedBy" field while updating or creating a document
*/

import { Schema, Types } from "mongoose";

const modifiedByPlugin = function (schema: Schema) {
  schema.add({
    createdBy: { type: Types.ObjectId, ref: "User" },
    updatedBy: { type: Types.ObjectId, ref: "User" },
  });

  schema.virtual("modifiedBy").set(function (userId) {
    if (this.isNew || !this.createdBy) {
      this.createdBy = this.updatedBy = userId;
    } else {
      this.updatedBy = userId;
    }
  });
};

export default modifiedByPlugin;
