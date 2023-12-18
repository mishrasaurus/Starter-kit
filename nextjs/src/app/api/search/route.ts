import { Collection, getModel } from "../apiUtils";

export async function POST(request: Request) {
  const Dashboard = await getModel(request, {
    collection: Collection.dashboard,
  });
  const payload = await request.json();
  const keyword = new RegExp(payload.keyword, "i");

  const query = Dashboard?.find({
    $or: [{ label: keyword }, { description: keyword }],
  });

  const results = await query?.exec();

  if (results) {
    return new Response(JSON.stringify(results));
  } else {
    return new Response(JSON.stringify({ error: "No results found" }), {
      status: 404,
    });
  }
}
