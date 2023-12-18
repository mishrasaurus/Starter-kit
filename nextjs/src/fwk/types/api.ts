export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}

export enum OpType {
  SET = "SET",
  ADD = "ADD",
  GET = "GET",
  REMOVE = "REMOVE",
  REORDER = "REORDER",
}

export interface Update {
  field: string;
  value?: any;
  opType: OpType;
}
