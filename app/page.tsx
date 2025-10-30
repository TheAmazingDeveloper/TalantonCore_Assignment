import ProductCard from "@/components/productCard";
import { getBaseUrl } from "@/lib/getBaseUrl";

export const revalidate = 3600;

export default async function Home() {
  if (process.env.VERCEL_ENV) {
    // Skip fetching during Vercel build (API not yet deployed)
    return [];
  }
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/products`, {
    next: { revalidate: 3600 },
  });
  const products = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
          <p className="text-gray-600 mt-1">Browse our latest collection</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
