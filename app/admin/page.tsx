"use client";
import { useState, useEffect } from "react";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    category: "",
    inventory: "",
  });
  const [editing, setEditing] = useState<any>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";

    const url = editing ? `/api/products/${editing._id}` : "/api/products";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_KEY || "",
      },
      body: JSON.stringify({
        ...form,
        price: +form.price,
        inventory: +form.inventory,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      alert(`Error: ${error.error || res.status}`);
      return;
    }

    setForm({
      name: "",
      slug: "",
      description: "",
      price: "",
      category: "",
      inventory: "",
    });
    setEditing(null);
    fetchProducts();
  };

  const startEdit = (p: any) => {
    setEditing(p);
    setForm({
      name: p.name,
      slug: p.slug,
      description: p.description || "",
      price: p.price.toString(),
      category: p.category,
      inventory: p.inventory.toString(),
    });
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: { "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_KEY || "" },
    });
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">
          Admin Panel
        </h1>

        <div className="bg-white shadow rounded-lg p-6 mb-10">
          <h2 className="text-lg font-medium mb-4">
            {editing ? "Edit Product" : "Add Product"}
          </h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            {Object.entries(form).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                  {key}
                </label>
                <input
                  value={value}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={key}
                  required
                  readOnly={editing && key === "slug"}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            ))}
            <div className="md:col-span-2 flex gap-3 mt-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white font-semibold rounded-md py-2 hover:bg-blue-700"
              >
                {editing ? "Update" : "Create"} Product
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setForm({
                      name: "",
                      slug: "",
                      description: "",
                      price: "",
                      category: "",
                      inventory: "",
                    });
                  }}
                  className="flex-1 bg-gray-200 font-medium rounded-md py-2 hover:bg-gray-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                {["Name", "Price", "Stock", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-medium uppercase text-gray-600 px-6 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p: any) => (
                <tr key={p._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm font-medium text-gray-800">
                    {p.name}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">
                    ${p.price}
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`font-semibold ${
                        p.inventory < 5 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {p.inventory}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm space-x-3">
                    <button
                      onClick={() => startEdit(p)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
