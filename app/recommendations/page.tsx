import WishlistButton from "@/components/wishlistButton";
import { getBaseUrl } from "@/lib/getBaseUrl";

async function getRecommended() {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/products`, {
    cache: "force-cache",
  });
  const all = await res.json();
  return all.slice(0, 3);
}

export default async function Recommendations() {
  const products = await getRecommended();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Recommended for You
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p: any) => (
            <div
              key={p.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition"
            >
              <div className="w-full h-40 bg-gray-100 rounded-md mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">
                ${p.price}
              </p>
              <div className="mt-4">
                <WishlistButton productId={p._id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
