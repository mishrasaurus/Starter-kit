import { SoftDeleteModel } from "mongoose-delete";
import mongoose from "mongoose";

declare module "mongoose" {
  interface QModel<T> extends SoftDeleteModel<T> {}
}
