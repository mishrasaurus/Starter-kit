import DashboardAPI from "../";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const dashboard = await DashboardAPI.findById(request, params.id);
  return new Response(JSON.stringify(dashboard));
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { label, description, assetIds } = await request.json();
  const dashboard = await DashboardAPI.findByIdAndUpdate(request, params.id, {
    label,
    description,
    assetIds,
  });
  return new Response(JSON.stringify(dashboard));
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const updateRequest = await request.json();
  const dashboard = await DashboardAPI.update(
    request,
    params.id,
    updateRequest.updates
  );
  return new Response(JSON.stringify(dashboard));
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await DashboardAPI.deleteById(request, params.id);
  return new Response(JSON.stringify(true));
}
