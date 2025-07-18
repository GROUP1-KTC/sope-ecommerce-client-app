import type { NextConfig } from "next";

const nextConfig: NextConfig = {
      // add other allowed domains here if needed
      output: "export",
      images: {
            unoptimized: true, 
  },
};

export default nextConfig;
