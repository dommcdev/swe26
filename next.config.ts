import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  allowedDevOrigins: ["*.tetra-salmon.ts.net"],
  serverExternalPackages: ["@libsql/client"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i3ae2rmmav.ufs.sh",
        port: "",
        pathname: "/f/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
