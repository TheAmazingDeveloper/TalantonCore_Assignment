import Link from "next/link";

export default function ProductCard({ product }: { product: any }) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <p className="text-2xl font-bold text-green-600">${product.price}</p>
        <p className="text-sm text-gray-500">Stock: {product.inventory}</p>
      </div>
    </Link>
  );
}
