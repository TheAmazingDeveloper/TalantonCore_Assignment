import ProductCard from "@/components/productCard";
import { getBaseUrl } from "@/lib/getBaseUrl";

export const revalidate = 3600;

export default async function Home() {
  const baseUrl = getBaseUrl();
  console.log("🧭 Fetching from:", `${baseUrl}/api/products`);

  try {
    const res = await fetch(`${baseUrl}/api/products`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const products = await res.json();

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Product Catalog
            </h1>
            <p className="text-gray-600 mt-1">Browse our latest collection</p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          {products.length === 0 ? (
            <p className="text-gray-600">No products available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    );
  } catch (err) {
    console.error("⚠️ Fetch failed:", err);
    return (
      <div className="p-8 text-center text-red-600">
        Failed to load products. Check server logs.
      </div>
    );
  }
}
