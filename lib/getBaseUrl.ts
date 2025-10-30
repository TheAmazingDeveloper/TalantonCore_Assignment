export function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Running in browser
    return "";
  }

  // Running on the server (Vercel or locally)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Local dev
  return "http://localhost:3000";
}
