import { Collection, getModel, getUserId, getOrgId } from "../apiUtils";

const UserQueryOptions = { password: 0 }; // exclude password
// all user get
export async function GET(request: Request) {
  const User = await getModel(request, { collection: Collection.user });
  const orgId = await getOrgId(request);

  const users = await User?.find({ orgId }, UserQueryOptions).sort({
    createdAt: -1,
  });
  return new Response(JSON.stringify(users));
}

// update user
export async function PATCH(request: Request) {
  const User = await getModel(request, { collection: Collection.user });
  const { id, name, role } = await request.json();
  const loggedInUserId = await getUserId(request);

  if (loggedInUserId !== id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const user = await User?.findByIdAndUpdate(
    id,
    { name, role },
    UserQueryOptions
  ); // allow explicity for these fields to be updated
  return new Response(JSON.stringify(user));
}
