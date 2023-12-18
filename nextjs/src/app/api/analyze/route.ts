import { getResults } from "./langchain";

export async function GET(request: Request) {
  const res = await getResults();

  console.log("in api", res);

  return new Response(JSON.stringify(res));
}
