import type { NextConfig } from "next";

const storageUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const storage = storageUrl ? new URL(storageUrl) : null;
const localStorage = !!storage && ["localhost", "127.0.0.1", "[::1]"].includes(storage.hostname);
const nextConfig: NextConfig = {
  redirects() {
    return [{ source: "/training", destination: "/careers#training-internships", permanent: true }];
  },
  experimental: { serverActions: { bodySizeLimit: "6mb" } },
  images: {
    dangerouslyAllowLocalIP: localStorage,
    remotePatterns: storage ? [{ protocol: storage.protocol === "http:" && localStorage ? "http" : "https", hostname: storage.hostname, port: storage.port, pathname: "/storage/v1/object/public/**" }] : [],
  },
};
export default nextConfig;
