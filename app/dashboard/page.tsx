export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  });
  const products = await res.json();

  const lowStock = products.filter((p: any) => p.inventory < 5).length;
  const totalProducts = products.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">
          Inventory Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-gray-600 font-medium">Total Products</h3>
            <p className="text-4xl font-bold text-blue-600 mt-2">
              {totalProducts}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-gray-600 font-medium">Low Stock Items</h3>
            <p className="text-4xl font-bold text-red-600 mt-2">{lowStock}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4 text-gray-800">
            Live Inventory
          </h3>
          <div className="space-y-2">
            {products.map((p: any) => (
              <div
                key={p.id}
                className="flex justify-between items-center border border-gray-100 rounded-md p-3 hover:bg-gray-50"
              >
                <span className="font-medium text-gray-800">{p.name}</span>
                <span
                  className={`font-semibold ${
                    p.inventory < 5 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {p.inventory} in stock
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
