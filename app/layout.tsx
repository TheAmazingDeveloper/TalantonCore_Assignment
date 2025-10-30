import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "E-Commerce Catalog",
  description: "Next.js Assignment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <ul className="flex gap-6 text-sm font-medium">
              <li>
                <Link href="/" className="text-blue-600 hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Admin
                </Link>
              </li>
              <li>
                <Link
                  href="/recommendations"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Recommendations
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
