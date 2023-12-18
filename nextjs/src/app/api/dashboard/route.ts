import DashboardAPI from "./";

export async function GET(request: Request) {
  const dashboards = await DashboardAPI.find(request);
  return new Response(JSON.stringify(dashboards));
}

export async function POST(request: Request) {
  const { label, description, assetType, type } = await request.json();
  const dashboard = await DashboardAPI.create(request, {
    label,
    description,
    assetType,
    type,
  });
  return new Response(JSON.stringify(dashboard));
}
