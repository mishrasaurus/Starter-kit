import { OpType } from "../types/api";

export const createUpdate = (field: string, opType: OpType, value?: any) => ({
  opType,
  field,
  value,
});
