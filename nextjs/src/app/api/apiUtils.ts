import { Collection, connectToDB } from "@/backend/database/mongo";
import { AssetType } from "@/backend/constants/assetType";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { User } from "next-auth";

interface CollectionOptions {
  collection: Collection;
}

export const getOrgId = async (request: Request) => {
  const token = await getToken({ req: request as NextRequest });
  // @ts-ignore
  const orgId = token?.user?.orgId;

  if (!orgId) {
    throw new Error("Organization ID not found");
  }
  return orgId;
};

export const getUserId = async (request: Request) => {
  const token = await getToken({ req: request as NextRequest });
  const userId = (token?.user as User)?.id;
  if (!userId) {
    throw new Error("User not found");
  }
  return userId;
};

export const getModel = async (
  request: Request,
  options: CollectionOptions
) => {
  const { collection } = options;
  let orgId;
  try {
    orgId = await getOrgId(request);
  } catch (error) {
    console.log(error);
    return null;
  }
  const db = await connectToDB({ collection, orgId });
  return db;
};

export { Collection, AssetType }; // re-export enum from backend to control access
