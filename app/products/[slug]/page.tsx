export const revalidate = 60;

export async function generateStaticParams() {
  const res = await fetch('/api/products');
  const products = await res.json();
  return products.map((p: any) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(
    `/api/products/${slug}`,
    { next: { revalidate: 60 } }
  );
  const product = await res.json();

  if (!product || product.error) {
    return (
      <div className="p-8 text-center text-red-600">Product not found</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-8 flex items-center justify-center bg-gray-100">
            <div className="w-full h-80 bg-gray-200 border-2 border-dashed rounded-xl" />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-gray-600 mt-3">{product.description}</p>

            <div className="mt-6">
              <span className="text-4xl font-bold text-green-600">
                ${product.price}
              </span>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p>
                Category:{" "}
                <span className="font-medium">{product.category}</span>
              </p>
              <p className="mt-1">
                Stock:{" "}
                <span
                  className={`font-semibold ${
                    product.inventory < 5 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {product.inventory} units
                </span>
              </p>
            </div>

            <button className="w-full mt-6 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
