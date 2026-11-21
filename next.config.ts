import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{
      source: "/projects/framepop/workbench.webp",
      destination: "/projects/framepop/video-models.webp",
      permanent: true,
    }];
  },
};

export default nextConfig;
