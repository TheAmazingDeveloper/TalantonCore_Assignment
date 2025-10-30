export function getBaseUrl() {
  // Client-side (browser)
  if (typeof window !== "undefined") return "";

  // ✅ Production (Vercel)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // ✅ When deployed under a custom domain
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  // ✅ Local development
  return "http://localhost:3000";
}
